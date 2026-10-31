const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'src', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const docContent = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>Dr. KAS'S Homemade Laddu Collection - Shop Product Catalogue</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
  @page {
    size: 21.0cm 29.7cm;
    margin: 2cm 2cm 2cm 2cm;
    mso-page-orientation: portrait;
  }
  body {
    font-family: 'Georgia', 'Calibri', 'Times New Roman', serif;
    color: #2D261E;
    line-height: 1.5;
    background-color: #FFFFFF;
  }
  .header {
    text-align: center;
    border-bottom: 2px solid #C28833;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }
  .company {
    font-size: 11pt;
    font-weight: bold;
    color: #1C3D2B;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .brand-title {
    font-size: 22pt;
    font-weight: bold;
    color: #8A4B08;
    margin: 4px 0;
  }
  .brand-subtitle {
    font-size: 14pt;
    font-style: italic;
    color: #C28833;
    margin-bottom: 4px;
  }
  .brand-tagline {
    font-size: 10pt;
    color: #5C4D3D;
  }
  .founder-banner {
    background-color: #FAF6EE;
    border: 1px solid #E8DEC9;
    border-left: 5px solid #1C3D2B;
    padding: 14px 18px;
    margin-bottom: 26px;
    font-size: 10pt;
  }
  .product-box {
    border: 1px solid #D8CDB8;
    margin-bottom: 24px;
    page-break-inside: avoid;
    background-color: #FFFFFF;
  }
  .product-header {
    background-color: #1C3D2B;
    color: #FFFFFF;
    padding: 10px 16px;
  }
  .product-title {
    font-size: 13pt;
    font-weight: bold;
    color: #FFFFFF;
    margin: 0;
  }
  .product-hindi {
    font-size: 10pt;
    color: #E5C378;
    margin-top: 2px;
  }
  .product-body {
    padding: 14px 18px;
    font-size: 10pt;
  }
  .tagline-pill {
    background-color: #FFF9F0;
    border-left: 3px solid #C28833;
    padding: 4px 10px;
    font-size: 9.5pt;
    font-weight: bold;
    color: #8A4B08;
    margin-bottom: 10px;
  }
  .section-heading {
    font-size: 10pt;
    font-weight: bold;
    color: #1C3D2B;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 10px;
    margin-bottom: 4px;
  }
  ul {
    margin-top: 3px;
    margin-bottom: 8px;
    padding-left: 20px;
  }
  li {
    margin-bottom: 2px;
  }
  table.nutri-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
    margin-bottom: 12px;
    font-size: 9pt;
  }
  table.nutri-table th {
    background-color: #FAF6EE;
    border: 1px solid #D8CDB8;
    padding: 6px 8px;
    text-align: left;
    color: #1C3D2B;
    font-weight: bold;
  }
  table.nutri-table td {
    border: 1px solid #E8DEC9;
    padding: 6px 8px;
  }
  .pricing-bar {
    background-color: #FAF6EE;
    border: 1px solid #E8DEC9;
    padding: 8px 14px;
    font-weight: bold;
    font-size: 10.5pt;
    color: #8A4B08;
    margin-top: 10px;
  }
  .footer {
    text-align: center;
    border-top: 1px solid #D8CDB8;
    padding-top: 16px;
    margin-top: 36px;
    font-size: 9pt;
    color: #6B5A47;
  }
</style>
</head>
<body>

<div class="header">
  <div class="company">KAS Nourish &amp; Nurture Foods</div>
  <div class="brand-title">DR. KAS'S HOMEMADE LADDU COLLECTION</div>
  <div class="brand-subtitle">Healing Mind, Body &amp; Soul</div>
  <div class="brand-tagline">Nourishing the Body. Nurturing the Mind. Inspiring Inner Harmony.</div>
  <div style="font-size: 10pt; color: #1C3D2B; margin-top: 6px;">
    A Wellness-Inspired Food Brand by <strong>Dr. Khan Afroz Shams</strong>
  </div>
</div>

<div class="founder-banner">
  <p style="margin: 0 0 6px 0; font-weight: bold; color: #1C3D2B; font-size: 10.5pt;">Our Brand Vision &amp; Philosophy:</p>
  <p style="margin: 0 0 6px 0; font-style: italic;">
    "At Dr. KAS'S, we bring together thoughtfully selected ingredients—including dry fruits and millets in selected recipes—the pleasure of satisfying taste, and a passion for holistic well-being. We believe that caring for ourselves can begin with small, everyday choices, and that wholesome food can make those choices more enjoyable."
  </p>
  <p style="margin: 0; font-size: 9.5pt; color: #5C4D3D;">
    <strong>Vision:</strong> To build a trusted wellness-inspired food brand that brings together traditional goodness, delightful taste, and mindful nutrition—making everyday nourishment a meaningful part of a healthier, more balanced life.<br/>
    <strong>Mission:</strong> To offer thoughtfully prepared homemade laddus that celebrate flavour and traditional food practices, while inspiring individuals and families to explore nutritious snack choices and develop healthier eating habits.
  </p>
</div>

<h2 style="color: #1C3D2B; font-size: 15pt; border-bottom: 2px solid #C28833; padding-bottom: 4px; margin-top: 24px;">
  Complete Shop Laddu Catalogue &amp; Nutritional Formulations
</h2>
<p style="font-size: 9.5pt; color: #6B5A47; margin-bottom: 18px;">
  100% Homemade • Handmade with Pure Desi Cow Ghee • Zero Artificial Sweetener • No Processed Sugar
</p>

${db.products.map((p, idx) => `
<div class="product-box">
  <div class="product-header">
    <div class="product-title">${idx + 1}. ${p.name}</div>
    ${p.hindiName ? `<div class="product-hindi">${p.hindiName} • ${p.categoryLabel || p.category}</div>` : ''}
  </div>
  <div class="product-body">
    ${p.tagline ? `<div class="tagline-pill">${p.tagline}</div>` : ''}
    <p style="margin: 0 0 10px 0; color: #3A3026;">${p.description}</p>
    
    <div class="section-heading">Key Wholesome Ingredients:</div>
    <ul>
      ${p.ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    
    <div class="section-heading">Key Health &amp; Mindful Benefits:</div>
    <ul>
      ${p.keyBenefits.map(b => `<li>${b}</li>`).join('')}
    </ul>
    
    <div class="section-heading">Approximate Nutritional Value (Per Serving):</div>
    <table class="nutri-table">
      <thead>
        <tr>
          <th>Serving Size</th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Healthy Fats</th>
          <th>Dietary Fiber</th>
          <th>Sweetener Source</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${p.nutrition.servingSize}</td>
          <td><strong>${p.nutrition.caloriesApprox} kcal</strong></td>
          <td>${p.nutrition.proteinG}g</td>
          <td>${p.nutrition.healthyFatsG}g</td>
          <td>${p.nutrition.dietaryFiberG}g</td>
          <td>${p.nutrition.sweetenerType}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="pricing-bar">
      Price: ₹${p.price} &nbsp;&nbsp;|&nbsp;&nbsp; Packaging: ${p.weight} &nbsp;&nbsp;|&nbsp;&nbsp; Production: ${p.inStock ? 'Available in Fresh Kitchen Batches' : 'Pre-order'}
    </div>
    
    <div style="font-size: 9pt; color: #6B5A47; margin-top: 8px;">
      <strong>Storage:</strong> ${p.storageInstructions || 'Store in an airtight glass container at room temperature for up to 30 days.'}<br/>
      <strong>Allergen Notice:</strong> ${p.allergenWarning || 'Contains tree nuts and dairy.'}
    </div>
  </div>
</div>
`).join('')}

<div class="footer">
  <p><strong>Dr. KAS'S Homemade Laddu Collection • KAS Nourish &amp; Nurture Foods</strong><br/>
  Nourishing Every Generation, Naturally • Wholesome Goodness • Mindful Nutrition • A Taste of Well-being<br/>
  Founder: Dr. Khan Afroz Shams (Ph.D. Organizational Psychology, Certified Nutritional Counsellor)<br/>
  Website: www.drkas.com • Handcrafted in New Delhi, India</p>
</div>

</body>
</html>
`;

// Save in public directory
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'DR_KAS_SHOP_LADDUS_CATALOGUE.doc'), docContent, 'utf8');
console.log('Successfully written to public/DR_KAS_SHOP_LADDUS_CATALOGUE.doc');
