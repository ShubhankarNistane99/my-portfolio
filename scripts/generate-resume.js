import { PDFDocument, rgb, StandardFonts, PDFName, PDFString } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  
  const fontTimes = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontTimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontTimesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const margin = 36;
  const pageWidth = 595.28; // Standard A4 points
  const pageHeight = 841.89; // Standard A4 points
  const contentWidth = pageWidth - (margin * 2);

  // Helper function to wrap text neatly within maxWidth
  function wrapText(text, maxWidth, font, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = font.widthOfTextAtSize(`${currentLine} ${word}`, fontSize);
      if (width < maxWidth) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  // Helper to add clickable hyperlink annotations
  function addLink(page, x, y, width, height, url) {
    const annot = pdfDoc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    });
    const annotRef = pdfDoc.context.register(annot);
    
    const existingAnnots = page.node.lookup(PDFName.of('Annots'));
    if (existingAnnots) {
      existingAnnots.push(annotRef);
    } else {
      page.node.set(PDFName.of('Annots'), pdfDoc.context.obj([annotRef]));
    }
  }

  // Helper for LaTeX style Section Heading with full-width rule
  function drawSectionHeading(page, title, currentY) {
    page.drawText(title, {
      x: margin,
      y: currentY,
      size: 10.8,
      font: fontTimesBold,
      color: rgb(0, 0, 0),
    });
    currentY -= 2.8;
    page.drawLine({
      start: { x: margin, y: currentY },
      end: { x: pageWidth - margin, y: currentY },
      thickness: 0.5,
      color: rgb(0.15, 0.15, 0.15),
    });
    return currentY - 10;
  }

  // Helper to draw LaTeX style bullet item with clean hanging indent
  function drawBullet(page, text, currentY, fontSize = 8.6, leading = 10.8) {
    const bulletX = margin + 5;
    const textX = margin + 13;
    const maxWidth = contentWidth - 13;

    page.drawText('•', {
      x: bulletX,
      y: currentY,
      size: fontSize,
      font: fontTimes,
      color: rgb(0.1, 0.1, 0.1),
    });

    const lines = wrapText(text, maxWidth, fontTimes, fontSize);
    for (let i = 0; i < lines.length; i++) {
      page.drawText(lines[i], {
        x: textX,
        y: currentY,
        size: fontSize,
        font: fontTimes,
        color: rgb(0.1, 0.1, 0.1),
      });
      currentY -= leading;
    }
    return currentY - 0.8;
  }

  // ==========================================
  // SINGLE-PAGE RESUME
  // ==========================================
  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 30;

  // Header: Name (Centered, LaTeX serif title)
  const name = 'SHUBHANKAR NISTANE';
  const nameSize = 19;
  const nameWidth = fontTimesBold.widthOfTextAtSize(name, nameSize);
  page.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y: y,
    size: nameSize,
    font: fontTimesBold,
    color: rgb(0, 0, 0),
  });
  y -= 14;

  // Header: Contact links
  const emailText = 'shubhankar.nistane.work@gmail.com';
  const linkedinText = 'LinkedIn';
  const githubText = 'GitHub';
  const spaceGap = 16;

  const emailW = fontTimes.widthOfTextAtSize(emailText, 8.8);
  const linkedinW = fontTimes.widthOfTextAtSize(linkedinText, 8.8);
  const githubW = fontTimes.widthOfTextAtSize(githubText, 8.8);
  const totalHeaderW = emailW + spaceGap + linkedinW + spaceGap + githubW;

  let startX = (pageWidth - totalHeaderW) / 2;

  // Email with link & underline
  page.drawText(emailText, {
    x: startX,
    y: y,
    size: 8.8,
    font: fontTimes,
    color: rgb(0.05, 0.05, 0.05),
  });
  page.drawLine({
    start: { x: startX, y: y - 1 },
    end: { x: startX + emailW, y: y - 1 },
    thickness: 0.45,
    color: rgb(0.1, 0.1, 0.1),
  });
  addLink(page, startX, y - 2, emailW, 11, 'mailto:shubhankar.nistane.work@gmail.com');
  startX += emailW + spaceGap;

  // LinkedIn with link & underline
  page.drawText(linkedinText, {
    x: startX,
    y: y,
    size: 8.8,
    font: fontTimes,
    color: rgb(0.08, 0.25, 0.6),
  });
  page.drawLine({
    start: { x: startX, y: y - 1 },
    end: { x: startX + linkedinW, y: y - 1 },
    thickness: 0.45,
    color: rgb(0.08, 0.25, 0.6),
  });
  addLink(page, startX, y - 2, linkedinW, 11, 'https://linkedin.com/in/shubhankar-nistane-735006181');
  startX += linkedinW + spaceGap;

  // GitHub with link & underline
  page.drawText(githubText, {
    x: startX,
    y: y,
    size: 8.8,
    font: fontTimes,
    color: rgb(0.08, 0.25, 0.6),
  });
  page.drawLine({
    start: { x: startX, y: y - 1 },
    end: { x: startX + githubW, y: y - 1 },
    thickness: 0.45,
    color: rgb(0.08, 0.25, 0.6),
  });
  addLink(page, startX, y - 2, githubW, 11, 'https://github.com/ShubhankarNistane99');

  y -= 15;

  // --- SECTION: EXPERIENCE ---
  y = drawSectionHeading(page, 'Experience', y);

  // Role 1A: Infosys - Senior Associate Consultant
  page.drawText('Infosys', { x: margin, y: y, size: 9.6, font: fontTimesBold });
  const date1a = 'Jul 2026 – Present';
  page.drawText(date1a, { x: pageWidth - margin - fontTimes.widthOfTextAtSize(date1a, 8.8), y: y, size: 8.8, font: fontTimes });
  y -= 10.5;

  page.drawText('Senior Associate Consultant', { x: margin, y: y, size: 8.8, font: fontTimesItalic });
  const loc1 = 'Mumbai, India';
  page.drawText(loc1, { x: pageWidth - margin - fontTimesItalic.widthOfTextAtSize(loc1, 8.8), y: y, size: 8.8, font: fontTimesItalic });
  y -= 11;

  const infosysSrBullets = [
    'Working on a telecom client project, contributing to application development and platform engineering using the client’s proprietary SLL programming language, a C++-like language.',
    'Modified Python deployment scripts for executable deployment, platform setup, and application configuration; developed JSON-based test cases using the client’s internal testing framework and performed development using the client-provided CPT tool.',
    'Provided L4 support for application and production tickets, including issue analysis, troubleshooting, and resolution for the telecom platform.'
  ];

  for (const b of infosysSrBullets) {
    y = drawBullet(page, b, y);
  }
  y -= 2.5;

  // Role 1B: Infosys - Associate Consultant
  const date1b = 'Oct 2024 – Jun 2026';
  page.drawText(date1b, { x: pageWidth - margin - fontTimes.widthOfTextAtSize(date1b, 8.8), y: y, size: 8.8, font: fontTimes });
  y -= 10.5;

  page.drawText('Associate Consultant', { x: margin, y: y, size: 8.8, font: fontTimesItalic });
  const loc1b = 'Mumbai, India';
  page.drawText(loc1b, { x: pageWidth - margin - fontTimesItalic.widthOfTextAtSize(loc1b, 8.8), y: y, size: 8.8, font: fontTimesItalic });
  y -= 11;

  const infosysBullets = [
    'Developed Java/Spring Boot backend services for a telecom data-integration platform supporting network inventory, transformation, reconciliation, and downstream delivery.',
    'Designed and implemented four end-to-end integration adapters and a modular 5G-to-4G integration solution for automated ingestion, transformation, validation, and reconciliation.',
    'Engineered batch-processing pipelines across REST/SOAP integrations with retry, timeout, error handling, and reusable transformation components.',
    'Improved processing scalability through parallel execution of up to 5 threads, batch splitting, Kafka consumer groups, and multi-pod deployment on Kubernetes.',
    'Worked across JSON, CSV, Neo4j, MinIO, Docker, and Kubernetes for data processing, service integration, health checks, monitoring, and automated testing; used GitHub Copilot and an internal client AI/GPT tool for development productivity.'
  ];

  for (const b of infosysBullets) {
    y = drawBullet(page, b, y);
  }
  y -= 2.5;

  // Role 2: NSE
  page.drawText('National Stock Exchange of India', { x: margin, y: y, size: 9.6, font: fontTimesBold });
  const date2 = 'July 2021 – Sept 2024';
  page.drawText(date2, { x: pageWidth - margin - fontTimes.widthOfTextAtSize(date2, 8.8), y: y, size: 8.8, font: fontTimes });
  y -= 10.5;

  page.drawText('System Analyst', { x: margin, y: y, size: 8.8, font: fontTimesItalic });
  const loc2 = 'Mumbai, India';
  page.drawText(loc2, { x: pageWidth - margin - fontTimesItalic.widthOfTextAtSize(loc2, 8.8), y: y, size: 8.8, font: fontTimesItalic });
  y -= 11;

  const nseBullets = [
    'Developed Java/Spring Boot REST APIs for a financial-market surveillance platform supporting report generation, file processing, SFTP-based data exchange, and database operations.',
    'Built backend services using Spring Data JPA, JDBC, and Hibernate for data upload, validation, maker-checker workflows, and surveillance applications.',
    'Contributed to the production frontend migration from Angular 7 to Angular 15, including associated UI dependencies.',
    'Automated production deployment using Linux Bash scripting, reducing estimated manual deployment effort by 70%; supported deployments, server migration, and production incident resolution.'
  ];

  for (const b of nseBullets) {
    y = drawBullet(page, b, y);
  }
  y -= 3;

  // --- SECTION: PROJECTS ---
  y = drawSectionHeading(page, 'Projects', y);

  // Project 1
  page.drawText('Maternity Care Website', { x: margin, y: y, size: 9.1, font: fontTimesBold });
  const p1Tech = ' | ReactJS, Google APIs, Material-UI';
  page.drawText(p1Tech, { x: margin + fontTimesBold.widthOfTextAtSize('Maternity Care Website', 9.1), y: y, size: 8.6, font: fontTimesItalic });
  y -= 10.5;
  y = drawBullet(page, 'Developed and hosted a maternity-care website during a web development internship as part of a three-member team.', y);
  y = drawBullet(page, 'Implemented nearest-doctor discovery using Google APIs, LEAP scoring, video integration, and responsive informational sections.', y);
  y -= 1.8;

  // Project 2
  page.drawText('Posture Detector', { x: margin, y: y, size: 9.1, font: fontTimesBold });
  const p2Tech = ' | Python, Arduino, OpenPose, TensorFlow';
  page.drawText(p2Tech, { x: margin + fontTimesBold.widthOfTextAtSize('Posture Detector', 9.1), y: y, size: 8.6, font: fontTimesItalic });
  y -= 10.5;
  y = drawBullet(page, 'Developed a posture-monitoring system using Python, Arduino Nano, OpenPose, TensorFlow, and Keras to detect incorrect posture and provide biofeedback.', y);
  y -= 1.8;

  // Project 3
  page.drawText('E-Learning Website', { x: margin, y: y, size: 9.1, font: fontTimesBold });
  const p3Tech = ' | Angular, Firebase, JavaScript';
  page.drawText(p3Tech, { x: margin + fontTimesBold.widthOfTextAtSize('E-Learning Website', 9.1), y: y, size: 8.6, font: fontTimesItalic });
  y -= 10.5;
  y = drawBullet(page, 'Developed an e-learning web application using Angular 6, Firebase authentication and CRUD operations, HTML, CSS, Bootstrap, and JavaScript.', y);
  y -= 3;

  // --- SECTION: TECHNICAL SKILLS ---
  y = drawSectionHeading(page, 'Technical Skills', y);

  const skillsList = [
    { title: 'Languages', value: 'Java, Python, SQL, JavaScript, Linux Shell Scripting' },
    { title: 'Backend', value: 'Spring Boot, Spring MVC, Spring Data JPA, Hibernate, REST, SOAP' },
    { title: 'Databases', value: 'PostgreSQL, Greenplum, Oracle 19c, Neo4j, Cypher, JDBC' },
    { title: 'Integration & Messaging', value: 'Kafka, SFTP, Data Transformation, Data Reconciliation' },
    { title: 'Cloud & DevOps', value: 'Docker, Kubernetes, MinIO' },
    { title: 'Frontend', value: 'Angular, ReactJS, Bootstrap, Material-UI, HTML,CSS' },
    { title: 'Tools', value: 'Git, Maven, GitHub, Postman, SVN' },
    { title: 'AI-Assisted Development', value: 'GitHub Copilot, ChatGPT, Google Gemini, Claude' },
  ];

  for (const s of skillsList) {
    const titleText = `${s.title}: `;
    page.drawText(titleText, {
      x: margin + 5,
      y: y,
      size: 8.6,
      font: fontTimesBold,
      color: rgb(0.05, 0.05, 0.05),
    });
    const titleWidth = fontTimesBold.widthOfTextAtSize(titleText, 8.6);
    page.drawText(s.value, {
      x: margin + 5 + titleWidth,
      y: y,
      size: 8.6,
      font: fontTimes,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 11.2;
  }
  y -= 2.5;

  // --- SECTION: EDUCATION ---
  y = drawSectionHeading(page, 'Education', y);

  page.drawText('Sardar Patel Institute of Technology', {
    x: margin,
    y: y,
    size: 9.6,
    font: fontTimesBold,
  });
  y -= 10.5;

  page.drawText('Bachelor of Technology in Information Technology', {
    x: margin,
    y: y,
    size: 8.8,
    font: fontTimesItalic,
  });
  const eduLoc = 'Mumbai, Maharashtra';
  page.drawText(eduLoc, {
    x: pageWidth - margin - fontTimesItalic.widthOfTextAtSize(eduLoc, 8.8),
    y: y,
    size: 8.8,
    font: fontTimesItalic,
  });
  y -= 13;

  // --- SECTION: ACHIEVEMENTS & CERTIFICATIONS ---
  y = drawSectionHeading(page, 'Achievements & Certifications', y);

  const certs = [
    'Received the RISE Insta Award from Infosys in July 2026.',
    'Published an IEEE research paper titled “An IoT Based Rectification of Posture using Biofeedback.”',
    'Completed Linux Bash Shell Scripting certification covering AWK and SED.',
    'Completed Google’s Build with Gemini program.',
    'Completed NSE NCFM certifications in Financial Markets and Mutual Funds.',
    'Completed Namaste JavaScript course covering JavaScript fundamentals and core concepts.'
  ];

  for (const c of certs) {
    y = drawBullet(page, c, y, 8.6, 10.8);
    y -= 0.6;
  }

  console.log(`Final Y position on page: ${y.toFixed(1)} pt (A4 height is ${pageHeight}, bottom margin is 36 pt)`);

  // Save PDF bytes
  const pdfBytes = await pdfDoc.save();

  const targetFiles = [
    path.resolve('public/Shubhankar_Nistane_Resume.pdf'),
  ];

  if (fs.existsSync(path.resolve('dist'))) {
    targetFiles.push(path.resolve('dist/Shubhankar_Nistane_Resume.pdf'));
  }

  for (const file of targetFiles) {
    fs.writeFileSync(file, pdfBytes);
    console.log(`Saved balanced single-page PDF to ${file} (${pdfBytes.length} bytes)`);
  }
}

generateResume().catch(console.error);
