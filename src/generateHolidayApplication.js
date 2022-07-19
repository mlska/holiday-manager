import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

const generateHolidayApplication = (data) => {
  const templatePath = "http://127.0.0.1:8080//application_template.docx";

  PizZipUtils.getBinaryContent(templatePath, function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.setData(data);
    try {
      doc.render();
    } catch (error) {
      console.log(error);
    }
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(
      out,
      `Urlop_${data.startDate}_${data.endDate}_${data.location}.docx`
    );
  });
};

export default generateHolidayApplication;
