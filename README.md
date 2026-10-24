# BIS NIDAAN

**AI-powered Intelligent Assistant for Indian Standards and BIS Services**

> Smart India Hackathon 2024 — Problem Statement: **SIH 26107** | Team: **404 minds**

---

## Overview

BIS NIDAAN is a unified platform for consumers, MSMEs, and businesses to:

- **Discover** applicable Indian Standards for any product
- **Verify** product authenticity and BIS certification status
- **Generate** Digital Product IDs and DataMatrix codes
- **Navigate** BIS compliance requirements step-by-step
- **Ask** an AI assistant about standards and certification

---

## Current Status: 30% Frontend Prototype

This repository contains the **Phase 1 frontend prototype** demonstrating the complete user experience with mock data.

### ✅ Implemented

| Feature | Status |
|---|---|
| Landing Page | ✅ Complete |
| Dashboard with charts | ✅ Complete |
| Product Database (search, filter, pagination) | ✅ Complete |
| Product Details with Trust Score | ✅ Complete |
| Digital Product ID Generation | ✅ Complete |
| DataMatrix Barcode Generator (bwip-js) | ✅ Complete |
| Product Verification Flow | ✅ Complete |
| Indian Standard Mapper | ✅ Complete |
| Compliance Navigator (step-by-step) | ✅ Complete |
| AI Assistant UI with Evidence Cards | ✅ Complete |
| Sample Product Matrix Generator | ✅ Complete |
| localStorage Persistence | ✅ Complete |
| Responsive Design (mobile + desktop) | ✅ Complete |
| Trust Score Engine | ✅ Complete |
| Source Evidence System | ✅ Complete |

### ❌ Not Yet Implemented (Future Phases)

- Spring Boot REST API Backend
- PostgreSQL Database
- Hyperledger Fabric Blockchain
- Real BIS API Integration
- Real LLM / RAG Backend
- Real OAuth Authentication
- Production GS1 DataMatrix
- Real Government Integrations (FSSAI, MeitY)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Charts | Recharts |
| Barcode | bwip-js |
| State | React Context + localStorage |
| Icons | Lucide React |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open: [http://localhost:5173](http://localhost:5173)

---

## Demo Flow (SIH Judges)

Follow this exact flow to see all key features:

1. **Dashboard** → Open `/dashboard` to see metrics and charts
2. **Data Matrix Generator** → Go to `/data-matrix`
   - Enter: Product = "ABC Smart Electric Kettle", Manufacturer = "Nova Appliances Pvt Ltd", Batch = "B24091", Standard = "IS 302", Cert = "CM/L-1234567890"
   - Click **Generate Product ID**
   - See: **BIS-PROD-10005** + DataMatrix barcode
3. **Verify** → Click "Verify This Product" → See ✓ VERIFIED + Trust Score 94/100
4. **Standard** → Click "View Standard" → See IS 302, Match 96%
5. **Compliance** → Click "Compliance Guidance" → See 7-step workflow
6. **AI Assistant** → Go to `/assistant` → Ask "What standard applies to this product?" → See evidence-backed response

---

## Project Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Topbar, Layout
│   └── common/         # StatusBadge, TrustScore, EvidenceCard, StatCard, EmptyState
├── pages/              # 11 route pages
├── data/               # Mock data (products, standards, compliance, assistant)
├── types/              # TypeScript interfaces
├── utils/              # productGenerator, trustScore, dataMatrix
├── hooks/              # useProducts (localStorage)
├── App.tsx             # Router
└── index.css           # Tailwind + custom design tokens
```

---

## Planned Future Architecture

```
React / Next.js Frontend
        ↓
Spring Boot REST API
        ↓
PostgreSQL + Redis
        ↓
Hyperledger Fabric (product provenance chain)
        ↓
LLM + RAG (BIS Knowledge Base)
        ↓
BIS Official APIs + GS1 + FSSAI
```

---

## Repository

**Name:** `bis-nidaan`  
**Description:** BIS NIDAAN — AI-powered BIS Standards, Product Verification and Compliance Assistant | SIH 26107 Prototype

---

## Team

**404 minds** — Smart India Hackathon 2024  
Problem Statement ID: **26107**

---

> ⚠️ **Disclaimer:** This is a prototype for SIH 2024. All data is synthetic. Not an official BIS service.
