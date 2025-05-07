const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const extractData = (text) => {
  const name = text.match(/Name[:\s]*(.*)/i)?.[1];
  const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0];
  const phone = text.match(/\+?\d[\d\s().-]{7,}\d/g)?.[0];
  const skills = text.match(/Skills[:\s]*(.*)/i)?.[1];
  const education = text.match(/Education[:\s]*([\s\S]*?)Experience/i)?.[1];
  const experience = text.match(/Experience[:\s]*([\s\S]*)/i)?.[1];

  return { name, email, phone, skills, education, experience };
};

exports.parse = async (filePath, ext) => {
  let text = '';

  if (ext === '.pdf') {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    text = data.text;
  } else if (ext === '.docx') {
    const result = await mammoth.extractRawText({ path: filePath });
    text = result.value;
  } else {
    throw new Error('Unsupported file format');
  }

  return extractData(text);
};
