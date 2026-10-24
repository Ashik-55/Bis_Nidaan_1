import type { MockResponse } from '../types/Assistant';

export const mockResponses: MockResponse[] = [
  {
    triggers: ['electric kettle', 'kettle', 'abc smart', 'is 302', 'what standard applies'],
    response: `Based on the BIS NIDAAN knowledge base (DEMO), **IS 302** is the applicable Indian Standard for household and similar electrical appliances, including electric kettles.

**IS 302: Safety of Household and Similar Electrical Appliances**

This standard covers electric kettles, irons, toasters, and similar household electrical appliances operating on rated voltage up to 250V AC. BIS certification under IS 302 is **mandatory** for sale in India.

**Key Requirements:**
- Safety testing at BIS-approved laboratory
- Factory quality control audit by BIS officials
- ISI mark certification (CM/L- license number)
- Annual license renewal

*Note: This is a prototype response based on. In the production system, this would be sourced from the official BIS standards database via RAG.*`,
    evidence: [
      {
        id: 'ev-001',
        standardCode: 'IS 302',
        title: 'Safety of Household and Similar Electrical Appliances',
        source: 'BIS Knowledge Base — DEMO',
        clause: 'Clause 1 — Scope',
        confidence: 96,
        verified: true,
        description: 'IS 302 applies to household and similar electrical appliances with rated voltage up to 250V for single-phase.',
      },
      {
        id: 'ev-002',
        standardCode: 'IS 302',
        title: 'Certification Requirement',
        source: 'BIS Compulsory Registration Order — DEMO',
        clause: 'Schedule II',
        confidence: 94,
        verified: true,
        description: 'Electric kettles are listed under mandatory BIS certification category under Schedule II.',
      },
    ],
  },
  {
    triggers: ['pressure cooker', 'is 2347', 'cooker'],
    response: `For domestic pressure cookers, the applicable Indian Standard is **IS 2347: Specification for Domestic Pressure Cookers**.

**IS 2347 covers:**
- Aluminium and stainless steel pressure cookers for household use
- Safety valve requirements and testing
- Gasket material specifications
- Pressure relief mechanism design
- Material quality requirements

**Certification:** Mandatory BIS certification (ISI mark) required for sale in India.

**Estimated certification timeline:** 60–90 days
**Approved labs:** CIPET Chennai, NABL Labs, IIT Madras Test Centre

*DEMO RESPONSE — Not an official BIS advisory.*`,
    evidence: [
      {
        id: 'ev-003',
        standardCode: 'IS 2347',
        title: 'Specification for Domestic Pressure Cookers',
        source: 'BIS Standards Database — DEMO',
        clause: 'Clause 1 — Scope',
        confidence: 98,
        verified: true,
        description: 'IS 2347 applies to aluminium and stainless steel domestic pressure cookers.',
      },
    ],
  },
  {
    triggers: ['verify', 'how to verify', 'product verification', 'check product'],
    response: `To verify a product using BIS NIDAAN, you can use **two methods**:

**Method 1: Scan DataMatrix Code**
- Use the Verify Product page to scan the product's DataMatrix code
- The system will decode the embedded product ID and fetch verification data

**Method 2: Enter Product ID**
- Go to the Verify Product page
- Enter the Digital Product ID (format: BIS-PROD-XXXXX)
- Click "Verify Product"

**What you'll see:**
- ✓ VERIFIED / ⚠ SUSPICIOUS / ✗ POSSIBLE COUNTERFEIT status
- Trust Score (0–100)
- Applicable Indian Standard
- Certification status
- Active recall information

**Demo Product IDs to try:**
- BIS-PROD-10001 (VERIFIED — Electric Kettle)
- BIS-PROD-10003 (SUSPICIOUS — Water Bottle)
- BIS-PROD-10008 (POSSIBLE COUNTERFEIT — LED Strip)

*DEMO RESPONSE — This is a prototype.*`,
    evidence: [
      {
        id: 'ev-004',
        standardCode: 'SYSTEM',
        title: 'BIS NIDAAN Verification System',
        source: 'BIS NIDAAN Prototype — DEMO',
        confidence: 100,
        verified: true,
        description: 'Product verification using Digital Product ID or DataMatrix scan.',
      },
    ],
  },
  {
    triggers: ['led bulb', 'led lamp', 'is 16102', 'bulb', 'light'],
    response: `For LED bulbs and lamps, the applicable standard is **IS 16102: Self-Ballasted LED Lamps for General Lighting Services**.

**IS 16102 covers:**
- Self-ballasted LED lamps for general lighting
- Performance requirements: lumen output, efficacy, power factor
- Colour rendering index (CRI) requirements
- Safety requirements under IS 16102 Part 1

**Certification:** Mandatory BIS certification required under Compulsory Registration Scheme (CRS).

**Testing parameters include:**
- Lumen maintenance
- Power consumption
- Power factor (≥0.9 for lamps >25W)
- Total harmonic distortion (THD)
- Colour temperature and CRI

*DEMO RESPONSE — Not an official BIS advisory.*`,
    evidence: [
      {
        id: 'ev-005',
        standardCode: 'IS 16102',
        title: 'Self-Ballasted LED Lamps — Performance Requirements',
        source: 'BIS Knowledge Base — DEMO',
        clause: 'Clause 5 — Performance Requirements',
        confidence: 95,
        verified: true,
        description: 'IS 16102 specifies performance and safety requirements for self-ballasted LED lamps.',
      },
    ],
  },
  {
    triggers: ['helmet', 'two wheeler', 'is 9844', 'bike helmet'],
    response: `For two-wheeler helmets, the applicable standard is **IS 9844: Protective Helmets for Two-Wheeler Riders**.

**IS 9844 covers:**
- Impact attenuation requirements
- Penetration resistance
- Retention system strength
- Field of vision requirements
- Shell rigidity

**Certification:** Mandatory BIS certification required. Using a non-ISI marked helmet is a traffic violation under Motor Vehicles Act.

**Testing required at:** ARAI Pune, NTF Ahmednagar, or other BIS-approved labs.

*DEMO RESPONSE — Not an official BIS advisory.*`,
    evidence: [
      {
        id: 'ev-006',
        standardCode: 'IS 9844',
        title: 'Protective Helmets for Two-Wheeler Riders',
        source: 'BIS Knowledge Base — DEMO',
        clause: 'Clause 6 — Performance Requirements',
        confidence: 97,
        verified: true,
        description: 'IS 9844 specifies protective helmet requirements for two-wheeler riders and pillion riders.',
      },
    ],
  },
  {
    triggers: ['cement', 'is 269', 'portland cement', 'construction'],
    response: `For Portland cement used in construction, the applicable standard is **IS 269: Specification for Ordinary Portland Cement, 53 Grade**.

**IS 269 covers:**
- Chemical composition limits
- Fineness of cement
- Setting time (initial and final)
- Compressive strength at 3, 7, and 28 days
- Soundness requirements

**Certification:** Mandatory BIS certification (ISI mark). Selling cement without ISI mark is illegal in India.

**Testing includes:** Chemical analysis, physical testing, strength testing at approved labs.

*DEMO RESPONSE — Not an official BIS advisory.*`,
    evidence: [
      {
        id: 'ev-007',
        standardCode: 'IS 269',
        title: 'Specification for Ordinary Portland Cement, 53 Grade',
        source: 'BIS Knowledge Base — DEMO',
        clause: 'Clause 4 — Chemical Requirements',
        confidence: 99,
        verified: true,
        description: 'IS 269 specifies requirements for OPC 53 grade cement used in construction.',
      },
    ],
  },
  {
    triggers: ['what is bis', 'bis nidaan', 'about', 'hello', 'hi', 'help'],
    response: `Welcome to **BIS NIDAAN AI Assistant** — your intelligent guide for Indian Standards and BIS services.

**I can help you with:**
- 📋 Finding applicable Indian Standards for any product
- ✅ Understanding BIS certification requirements
- 🔍 Explaining the product verification process
- 📊 Compliance guidance and step-by-step certification roadmap
- 🏭 Information about approved testing laboratories
- 📄 Required documents for BIS certification

**Try asking me:**
- *"What standard applies to an electric kettle?"*
- *"How do I get BIS certification for my pressure cooker?"*
- *"What is IS 302?"*
- *"How can I verify a product?"*
- *"What labs are approved for LED lamp testing?"*

**Note:** This is a DEMO prototype. All responses are based on sample data and do not constitute official BIS guidance.`,
    evidence: [],
  },
  {
    triggers: ['is 302', 'what is is 302'],
    response: `**IS 302: Safety of Household and Similar Electrical Appliances**

IS 302 is an Indian Standard published by the Bureau of Indian Standards (BIS) that specifies **safety requirements for household and similar electrical appliances**.

**Scope:**
- Covers electrical appliances for household, commercial, and similar general purposes
- Applies to appliances with rated voltage up to 250V for single-phase
- Includes: electric kettles, irons, toasters, food mixers, room heaters, hair dryers

**Key Clauses:**
- Clause 1: Scope and applicability
- Clause 7: Marking requirements
- Clause 8: Protection against access to live parts
- Clause 11: Power input and current requirements
- Clause 13: Leakage current and electric strength

**Certification:** Mandatory ISI Mark certification required. BIS License number format: CM/L-XXXXXXXXXX

*DEMO RESPONSE — For official information, visit the BIS website.*`,
    evidence: [
      {
        id: 'ev-008',
        standardCode: 'IS 302',
        title: 'IS 302 — Full Standard Overview',
        source: 'BIS Standards Database — DEMO',
        confidence: 92,
        verified: true,
        description: 'IS 302 safety requirements for household electrical appliances.',
      },
    ],
  },
  {
    triggers: ['certification', 'how to certify', 'bis certification', 'isi mark'],
    response: `**How to Get BIS Certification (ISI Mark)**

BIS certification (ISI mark) is mandatory for many products sold in India under the BIS Act, 2016.

**General Certification Process:**

1. **Identify applicable standard** — Find the IS number for your product
2. **Apply to BIS** — Submit application with technical documents and fees
3. **Testing** — Submit product samples to BIS-approved NABL lab
4. **Factory audit** — BIS officials inspect manufacturing facility
5. **Grant of license** — Receive CM/L- license number
6. **Use ISI mark** — Affix ISI mark on certified products
7. **Renewal** — Annual renewal with surveillance tests

**Approximate Timeline:** 45–120 days depending on product category

**Fees:** ₹10,000–₹50,000 + testing costs (varies by product and lab)

**Contact BIS:** BIS Headquarters, Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002

*DEMO RESPONSE — Visit www.bis.gov.in for official information.*`,
    evidence: [
      {
        id: 'ev-009',
        standardCode: 'BIS Act 2016',
        title: 'BIS Certification Process',
        source: 'BIS Certification Scheme — DEMO',
        confidence: 90,
        verified: true,
        description: 'General BIS certification process for mandatory ISI mark products.',
      },
    ],
  },
];

export const fallbackResponse: MockResponse = {
  triggers: [],
  response: `I understand you're asking about **"{{query}}"**. 

Based on my demo knowledge base, I can provide guidance on:
- Indian Standards applicable to your product category
- BIS certification requirements and process
- Product verification procedures
- Compliance timelines and documentation

**Please try asking about specific products or standards**, for example:
- *"What standard applies to an electric kettle?"*
- *"How to get BIS certification?"*
- *"What is IS 302?"*

*This is a DEMO prototype response. The production system will use AI/RAG to answer queries from the official BIS knowledge base.*`,
  evidence: [
    {
      id: 'ev-fallback',
      standardCode: 'DEMO',
      title: 'BIS NIDAAN Knowledge Base',
      source: 'BIS NIDAAN Prototype — DEMO',
      confidence: 60,
      verified: false,
      description: 'Demo response — production system will use real BIS knowledge base.',
    },
  ],
};
