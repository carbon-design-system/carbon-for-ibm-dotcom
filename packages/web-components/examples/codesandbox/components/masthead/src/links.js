/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-len */

/**
 * Masthead items.
 */
const mastheadLinks = [
  {
    title: 'Products',
    url: '',
    hasMenu: true,
    hasMegapanel: true,
    menuSections: [
      {
        heading: 'Explore',
        menuItems: [
          {
            title: 'Products',
            url: 'https://www.ibm.com/products?lnk=hpmpr&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Products',
              headingUrl: 'https://www.ibm.com/products?lnk=hpmpr&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Find, try or buy products and services',
                links: [
                  {
                    title: 'Free trials',
                    url: 'https://www.ibm.com/products/trials?lnk=hpmpr&lnk2=trial&lnk=STW_US_MAST_NAV_TL&lnk2=trial_THP',
                  },
                  {
                    title: 'Current deals',
                    url:
                      'https://www.ibm.com/products/offers-and-discounts?lnk=hpmpr&lnk2=trial&lnk=STW_US_MAST_NAV_TL&lnk2=discount_MPDISC',
                  },
                  {
                    title: 'Technologies',
                    url:
                      'https://www.ibm.com/products/category/technology?lnk=hpmpr&lnk2=learn&lnk=STW_US_MAST_NAV_TL&lnk2=learn_CATTech',
                  },
                  {
                    title: 'Business needs',
                    url:
                      'https://www.ibm.com/products/category/business?lnk=hpmpr&lnk2=learn&lnk=STW_US_MAST_NAV_TL&lnk2=learn_CATBusneeds',
                  },
                  {
                    title: 'Services',
                    url: 'https://www.ibm.com/products/services?lnk=hpmpr&lnk2=learn&lnk=STW_US_MAST_NAV_TL&lnk2=learn_VHP',
                  },
                  {
                    title: 'Hardware',
                    url: 'https://www.ibm.com/products/hardware?lnk=hpmpr&lnk2=learn&lnk=STW_US_MAST_NAV_TL&lnk2=learn_HHP',
                  },
                  {
                    title: 'Software',
                    url: 'https://www.ibm.com/products/software?lnk=hpmpr&lnk2=learn&lnk=STW_US_MAST_NAV_TL&lnk2=learn_SHP',
                  },
                  {
                    title: 'View all products',
                    url: 'https://www.ibm.com/products?lnk=hpmpr&lnk2=learn&lnk=STW_US_MAST_NAV_TL&lnk2=learn_MHP',
                  },
                ],
              },
              feature: {
                heading: 'See current deals on IBM products',
                imageUrl: 'https://1.dam.s81c.com/m/7beb01350471aa09/original/discount_software_megamenu_600x245.jpg',
                linkTitle: 'Take advantage of limited-time offers and discounts',
                linkUrl:
                  'https://www.ibm.com/products/offers-and-discounts?lnk=hpmpr&lnk2=trial&lnk=STW_US_MAST_BNR_TL&lnk2=discount_MPDISC',
              },
            },
          },
          {
            title: 'Analytics',
            url: 'https://www.ibm.com/analytics?lnk=hpmpr_bua',
            megapanelContent: {
              headingTitle: 'Analytics',
              headingUrl: 'https://www.ibm.com/analytics?lnk=hpmpr_bua',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Business Analytics',
                    url: 'https://www.ibm.com/analytics/business-analytics?lnk=hpmpr_bua',
                  },
                  {
                    title: 'Data Management',
                    url: 'https://www.ibm.com/analytics/data-management?lnk=hpmpr_bua',
                  },
                  {
                    title: 'Data Science',
                    url: 'https://www.ibm.com/analytics/data-science?lnk=hpmpr_bua',
                  },
                  {
                    title: 'Journey to AI',
                    url: 'https://www.ibm.com/analytics/journey-to-ai?lnk=hpmpr_bua',
                  },
                  {
                    title: 'DataOps',
                    url: 'https://www.ibm.com/analytics/dataops',
                  },
                  {
                    title: 'Watson Studio',
                    url: 'https://www.ibm.com/cloud/watson-studio?lnk=hpmpr_bua',
                  },
                ],
              },
              feature: {
                heading: 'Transform financial and operational performance',
                imageUrl: 'https://1.dam.s81c.com/m/1ed1ab3c7cfd47ff/original/analytics_feature_panel.jpg?1=1',
                linkTitle:
                  'Make faster decisions when you automate your manual processes for planning, budgeting and forecasting',
                linkUrl: 'https://www.ibm.com/analytics/integrated-planning/?lnk=hpmpr_bua',
              },
            },
          },
          {
            title: 'Automation',
            url: 'https://www.ibm.com/automation?lnk=hpmpr_buau',
            megapanelContent: {
              headingTitle: 'Automation',
              headingUrl: 'https://www.ibm.com/automation?lnk=hpmpr_buau',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Automation Platform',
                    url: 'https://www.ibm.com/automation/platform?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Automation Services',
                    url: 'https://www.ibm.com/automation/services?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Automation Software',
                    url: 'https://www.ibm.com/automation/software?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Content Services',
                    url: 'https://www.ibm.com/automation/enterprise-content-management?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Data Capture',
                    url: 'https://www.ibm.com/automation/data-capture?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Decision Automation',
                    url: 'https://www.ibm.com/automation/business-rules?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Process Mapping',
                    url: 'https://www.ibm.com/automation/process-mapping?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Robotic Process Automation',
                    url: 'https://www.ibm.com/automation/rpa?lnk=hpmpr_buau',
                  },
                  {
                    title: 'Workflow Automation',
                    url: 'https://www.ibm.com/automation/workflow?lnk=hpmpr_buau',
                  },
                ],
              },
              feature: {
                heading: 'The rise of Intelligent Automation',
                imageUrl: 'https://1.cms.s81c.com/sites/default/files/2019-10-10/Automation_Leadspaces_BKGRND_Overview.png',
                linkTitle: 'Automation is transforming how we work — what if we infuse it with AI?',
                linkUrl: 'https://www.ibm.com/automation',
              },
            },
          },
          {
            title: 'Blockchain',
            url: 'https://www.ibm.com/blockchain?lnk=hpmpr_buau',
            megapanelContent: {
              headingTitle: 'Blockchain',
              headingUrl: 'https://www.ibm.com/blockchain?lnk=hpmpr_buau',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Blockchain Solutions',
                    url: 'https://www.ibm.com/blockchain/solutions/?lnk=hpmpr_bubk',
                  },
                  {
                    title: 'Blockchain Platform',
                    url: 'https://www.ibm.com/blockchain/platform?lnk=hpmpr_bubk',
                  },
                  {
                    title: 'Blockchain Services',
                    url: 'https://www.ibm.com/blockchain/services?lnk=hpmpr_bubk',
                  },
                  {
                    title: 'IBM Food Trust',
                    url: 'https://www.ibm.com/blockchain/solutions/food-trust?lnk=hpmpr_bubk',
                  },
                  {
                    title: 'IBM World Wire',
                    url: 'https://www.ibm.com/blockchain/solutions/world-wire?lnk=hpmpr_bubk',
                  },
                  {
                    title: 'Blockchain Trade Finance',
                    url: 'https://www.ibm.com/blockchain/solutions/trade-finance?lnk=hpmpr_bubk',
                  },
                  {
                    title: 'Blockchain Ecosystem',
                    url: 'https://www.ibm.com/blockchain/ecosystem?lnk=hpmpr_bubk',
                  },
                  {
                    title: 'Blockchain Supply Chain',
                    url: 'https://www.ibm.com/blockchain/industries/supply-chain?lnk=hpmpr_bubk',
                  },
                ],
              },
              feature: {
                heading: 'Transform your business and disrupt your industry with IBM Blockchain',
                imageUrl: 'https://www.ibm.com/images/portal/G717140Y84102C99/imagem-0001.jpg',
                linkTitle: 'What is blockchain?',
                linkUrl: 'https://www.ibm.com/blockchain/what-is-blockchain?lnk=hpmpr_bubk',
              },
            },
          },
          {
            title: 'Cloud',
            url: 'https://www.ibm.com/cloud/?lnk=hpmpr_bucl&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Cloud',
              headingUrl: 'https://www.ibm.com/cloud/?lnk=hpmpr_bucl&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'IBM Cloud',
                    url: 'https://www.ibm.com/cloud/?lnk=hpmpr_bucl',
                  },
                  {
                    title: 'IBM Cloud Paks',
                    url: 'https://www.ibm.com/cloud/paks/?lnk=hpmpr_bucl',
                  },
                  {
                    title: 'Red Hat',
                    url: 'https://www.ibm.com/cloud/redhat?lnk=hpmpr_bucl',
                  },
                  {
                    title: 'IBM Garage',
                    url: 'https://www.ibm.com/garage?lnk=hpmpr_bucl',
                  },
                  {
                    title: 'IBM Cloud Object Storage',
                    url: 'https://www.ibm.com/cloud/object-storage?lnk=hpmpr_bucl',
                  },
                  {
                    title: 'Bare metal servers',
                    url: 'https://www.ibm.com/cloud/bare-metal-servers?lnk=hpmpr_bucl',
                  },
                ],
              },
              feature: {
                heading: 'A simpler path to cloud with IBM and VMware',
                imageUrl: 'https://1.dam.s81c.com/m/52a6ddb413546b90/original/CDT_440_rollover.jpg?1=1',
                linkTitle: 'Access to a global network of 60+ data centers and an array of cloud services',
                linkUrl: 'https://www.ibm.com/cloud/vmware?lnk=hpmpr_bucl&lnk2=learn',
              },
            },
          },
          {
            title: 'Internet of Things',
            url: 'https://www.ibm.com/internet-of-things?lnk=hpmpr_iot',
            megapanelContent: {
              headingTitle: 'Internet of Things',
              headingUrl: 'https://www.ibm.com/internet-of-things?lnk=hpmpr_iot',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Enterprise asset management',
                    url: 'https://www.ibm.com/internet-of-things/solutions/enterprise-asset-management?lnk=hpmpr_iot&lnk2=learn',
                  },
                  {
                    title: 'Facilities management',
                    url: 'https://www.ibm.com/internet-of-things/solutions/facilities-management?lnk=hpmpr_iot&lnk2=learn',
                  },
                  {
                    title: 'Systems engineering',
                    url: 'https://www.ibm.com/internet-of-things/solutions/systems-engineering?lnk=hpmpr_iot&lnk2=learn',
                  },
                  {
                    title: 'IoT platform',
                    url: 'https://www.ibm.com/internet-of-things/solutions/iot-platform?lnk=hpmpr_iot&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'Watson Internet of Things',
                imageUrl: 'https://1.dam.s81c.com/m/24896629396b33ef/original/watson_iot_380x160.png',
                linkTitle: 'See how an intelligent IoT will transform the way every person experiences the physical world',
                linkUrl: 'https://www.ibm.com/internet-of-things?lnk=hpmpr_iot',
              },
            },
          },
          {
            title: 'IT Infrastructure',
            url: 'https://www.ibm.com/it-infrastructure/us-en/?lnk=hpmpr_buit&lnk2=learn',
            megapanelContent: {
              headingTitle: 'IT Infrastructure',
              headingUrl: 'https://www.ibm.com/it-infrastructure/us-en/?lnk=hpmpr_buit&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Servers',
                    url: 'https://www.ibm.com/it-infrastructure/servers?lnk=hpmpr_buit&lnk2=learn',
                  },
                  {
                    title: 'Storage',
                    url: 'https://www.ibm.com/it-infrastructure/storage?lnk=hpmpr_buit&lnk2=learn',
                  },
                  {
                    title: 'Software',
                    url: 'https://www.ibm.com/it-infrastructure/software?lnk=hpmpr_buit&lnk2=learn',
                  },
                  { title: '&nbsp;&nbsp;', url: '&nbsp;' },
                  {
                    title: 'IBM LinuxONE',
                    url: 'https://www.ibm.com/it-infrastructure/linuxone?lnk=hpmpr_buit&lnk2=learn',
                  },
                  {
                    title: 'IBM Power Systems',
                    url: 'https://www.ibm.com/it-infrastructure/power?lnk=hpmpr_buit&lnk2=learn',
                  },
                  {
                    title: 'IBM Spectrum Computing',
                    url: 'https://www.ibm.com/it-infrastructure/spectrum-computing?lnk=hpmpr_buit&lnk2=learn',
                  },
                  {
                    title: 'IBM Z',
                    url: 'https://www.ibm.com/it-infrastructure/z?lnk=hpmpr_buit&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'The building block for next-generation IT infrastructure',
                imageUrl:
                  'https://www.ibm.com/images/portal/D188507U77167V28/IT-infrastructure-fly-out-home-page-380x160.jpg?1=1',
                linkTitle: 'Discover IT optimized for your most demanding workloads',
                linkUrl: 'https://www.ibm.com/it-infrastructure?lnk=hpmpr_buit&lnk2=learn',
              },
            },
          },
          {
            title: 'Mobile',
            url: 'https://www.ibm.com/mobile?lnk=hpmpr_bumf&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Mobile',
              headingUrl: 'https://www.ibm.com/mobile?lnk=hpmpr_bumf&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'CIO resources',
                    url: 'https://www.ibm.com/thought-leadership/chief-information-officer/create/?lnk=hpmpr_bumf&lnk2=learn',
                  },
                  {
                    title: 'Mobile Foundation',
                    url: 'https://www.ibm.com/cloud/mobile-foundation?lnk=hpmpr_bumf&lnk2=learn',
                  },
                  {
                    title: 'API Connect',
                    url: 'https://www.ibm.com/cloud/api-connect?lnk=hpmpr_bumf&lnk2=learn',
                  },
                  {
                    title: 'IBM Cloudant',
                    url: 'https://www.ibm.com/cloud/cloudant?lnk=hpmpr_bumf&lnk2=learn',
                  },
                  {
                    title: 'Swift@IBM',
                    url: 'https://www.ibm.com/cloud/swift?lnk=hpmpr_bumf&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'Inspire exceptional digital experiences',
                imageUrl: 'https://www.ibm.com/images/portal/P081788Y02146I09/megamenu-380x160.jpg?1=102',
                linkTitle: 'Can your organization deliver differentiated experiences and enable a truly digital workplace?',
                linkUrl:
                  'https://www.ibm.com/thought-leadership/chief-information-officer/exceptional-digital-experiences/?lnk=hpmpr_bumf&lnk2=learn',
              },
            },
          },
          {
            title: 'Security',
            url: 'https://www.ibm.com/security?lnk=hpmpr_buse',
            megapanelContent: {
              headingTitle: 'Security',
              headingUrl: 'https://www.ibm.com/security?lnk=hpmpr_buse',
              description: 'Let’s drive security into the fabric of your business, together',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Security and risk management',
                    url: 'https://www.ibm.com/security/strategy-risk-management?lnk=hpmpr_buse',
                  },
                  {
                    title: 'Threat management',
                    url: 'https://www.ibm.com/security/threat-management?lnk=hpmpr_buse',
                  },
                  {
                    title: 'Digital trust',
                    url: 'https://www.ibm.com/security/digital-trust?lnk=hpmpr_buse',
                  },
                  {
                    title: 'Cloud security',
                    url: 'https://www.ibm.com/security/cloud?lnk=hpmpr_buse',
                  },
                ],
              },
              feature: {
                heading: 'Cost of a Data Breach study',
                imageUrl: 'https://1.dam.s81c.com/m/164772c39e502c72/original/megamenu-cost-of-data-breach-22827-600x245.jpg',
                linkTitle: 'An essential report on today’s security landscape',
                linkUrl: 'https://www.ibm.com/security/data-breach?lnk=hpmpr_buse&lnk2=learn',
              },
            },
          },
          {
            title: 'Supply Chain',
            url: 'https://www.ibm.com/supply-chain?lnk=hpmpr_busc&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Supply Chain',
              headingUrl: 'https://www.ibm.com/supply-chain?lnk=hpmpr_busc&lnk2=learn',
              description:
                'Explore the benefits of supply chain analytics, the foundation for applying artificial intelligence to the supply chain process',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Sterling Supply Chain',
                    url: 'https://www.ibm.com/supply-chain?lnk=hpmpr_busc&lnk2=learn',
                  },
                  {
                    title: 'B2B Collaboration',
                    url: 'https://www.ibm.com/supply-chain/collaboration?lnk=hpmpr_busc&lnk2=learn',
                  },
                  {
                    title: 'Supply chain visibility',
                    url: 'https://www.ibm.com/supply-chain/visibility?lnk=hpmpr_busc&lnk2=learn',
                  },
                  {
                    title: 'Order management',
                    url: 'https://www.ibm.com/supply-chain/order-management-software?lnk=hpmpr_busc&lnk2=learn',
                  },
                  {
                    title: 'IBM Blockchain for supply chain',
                    url: 'https://www.ibm.com/blockchain/industries/supply-chain?lnk=hpmpr_busc&lnk2=learn',
                  },
                  {
                    title: 'Retail solutions',
                    url: 'https://www.ibm.com/industries/retail-consumer-products/supply-chain?lnk=hpmpr_busc&lnk2=learn',
                  },
                  {
                    title: 'Industrial solutions',
                    url: 'https://www.ibm.com/industries/industrial/supply-chain-solutions?lnk=hpmpr_busc',
                  },
                ],
              },
              feature: {
                heading: 'Inventory management: a critical element of the supply chain',
                imageUrl: 'https://1.dam.s81c.com/m/10e3f54af21a2fb5/original/ipad-in-warehouse-mm.png',
                linkTitle:
                  'Know where all of your inventory is so you can get the right product to the right place at the right time.',
                linkUrl: 'https://www.ibm.com/supply-chain/inventory-management?lnk=hpmpr_busc',
              },
            },
          },
          {
            title: 'Talent',
            url: 'https://www.ibm.com/services/process/talent?lnk=hpmpr_buta&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Talent Management',
              headingUrl: 'https://www.ibm.com/talent-management?lnk=hpmpr_buta',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Watson Talent Services',
                    url: 'https://www.ibm.com/talent-management/watson-talent-services?lnk=hpmpr_buta',
                  },
                  {
                    title: 'Talent and Transformation',
                    url: 'https://www.ibm.com/services/process/talent?lnk=hpmpr_buta',
                  },
                ],
              },
              feature: {
                heading: 'Talent Frameworks: Enable AI-powered HR transformation',
                imageUrl: 'https://1.dam.s81c.com/m/37d6c5711e2ae9ae/original/megamenu-marketplace-talent-22829-600x245.jpg',
                linkTitle: 'Define the competencies and roles your business needs',
                linkUrl: 'https://www.ibm.com/talent-management?lnk=hpmpr_buta',
              },
            },
          },
          {
            title: 'Watson',
            url: 'https://www.ibm.com/watson?lnk=hpmpr_buwa',
            megapanelContent: {
              headingTitle: 'Watson',
              headingUrl: 'https://www.ibm.com/watson?lnk=hpmpr_buwa',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Watson Advertising',
                    url: 'https://www.ibm.com/watson-advertising?lnk=hpmpr_buwa',
                  },
                  {
                    title: 'Apps and APIs',
                    url: 'https://www.ibm.com/watson/products-services?lnk=hpmpr_buwa',
                  },
                  {
                    title: 'Watson Education',
                    url: 'https://www.ibm.com/watson/education?lnk=hpmpr_buwa',
                  },
                  {
                    title: 'Watson Talent',
                    url: 'https://www.ibm.com/talent-management?lnk=hpmpr_buwa',
                  },
                ],
              },
              feature: {
                heading: 'Start building your own virtual assistants in minutes',
                imageUrl: 'https://1.dam.s81c.com/m/588399b113366e3a/original/watson_assistant_megamenu_600x245.jpg',
                linkTitle: 'Get started free with IBM Watson Assistant',
                linkUrl:
                  'https://www.ibm.com/cloud/watson-assistant?lnk=hpmpr_buwa&lnk2=trial&lnk=STW_US_MAST_BNR_TL&lnk2=trial_WatAssist',
              },
            },
          },
          {
            title: 'Watson Health',
            url: 'https://www.ibm.com/watson-health?lnk=hpmpr_buwh',
            megapanelContent: {
              headingTitle: 'Watson Health',
              headingUrl: 'https://www.ibm.com/watson-health?lnk=hpmpr_buwh',
              description: 'Watson Health provides AI and data-driven technologies to advance health',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Employer solutions',
                    url: 'https://www.ibm.com/watson-health/solutions/employer-benefits-management?lnk=hpmpr_buwh',
                  },
                  {
                    title: 'Life sciences solutions',
                    url: 'https://www.ibm.com/watson-health/life-sciences?lnk=hpmpr_buwh&lnk2=learn',
                  },
                  {
                    title: 'Government solutions',
                    url: 'https://www.ibm.com/watson-health/government?lnk=hpmpr_buwh&lnk2=learn',
                  },
                  {
                    title: 'Health plan solutions',
                    url: 'https://www.ibm.com/watson-health/health-plan?lnk=hpmpr_buwh&lnk2=learn',
                  },
                  {
                    title: 'Imaging solutions',
                    url: 'https://www.ibm.com/watson-health/imaging?lnk=hpmpr_buwh&lnk2=learn',
                  },
                  {
                    title: 'Provider solutions',
                    url: 'https://www.ibm.com/watson-health/provider?lnk=hpmpr_buwh&lnk2=learn',
                  },
                  {
                    title: 'Watson Oncology',
                    url: 'https://www.ibm.com/watson-health/oncology-and-genomics?lnk=hpmpr_buwh&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'Micromedex with Watson',
                imageUrl: 'https://1.dam.s81c.com/m/6f79ffef99b07bdf/original/micromedex-image-wh.jpg',
                linkTitle:
                  'Micromedex offers comprehensive, evidence-based clinical decision support and resources at the point of care',
                linkUrl: 'https://www.ibm.com/us-en/marketplace/micromedex-with-watson?lnk=hpmpr_buwh&lnk2=learn',
              },
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Services',
    url: '',
    hasMenu: true,
    hasMegapanel: true,
    menuSections: [
      {
        heading: '',
        menuItems: [
          {
            title: 'Services',
            url: 'https://www-935.ibm.com/services/index.html?lnk=hpmse_ts',
            megapanelContent: {
              headingTitle: 'Services',
              headingUrl: 'https://www.ibm.com/services?lnk=hpmse_ts&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Application Services',
                    url: 'https://www.ibm.com/services/applications?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Business Process and Operations',
                    url: 'https://www.ibm.com/services/process?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Business Resiliency Services',
                    url: 'https://www.ibm.com/services/business-continuity?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Business Strategy and Design',
                    url: 'https://www.ibm.com/services/business?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Cloud Services',
                    url: 'https://www.ibm.com/services/cloud?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Data and AI Services',
                    url: 'https://www.ibm.com/analytics/services?lnk=hpmse_ts',
                  },
                  {
                    title: 'Digital Workplace Services',
                    url: 'https://www.ibm.com/services/digital-workplace?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Network Services',
                    url: 'https://www.ibm.com/services/network?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Security Services',
                    url: 'https://www.ibm.com/security/services?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Talent and Transformation',
                    url: 'https://www.ibm.com/services/process/talent?lnk=hpmse_ts&lnk2=learn',
                  },
                  {
                    title: 'Technology Services',
                    url: 'https://www.ibm.com/services/technology?lnk=hpmse_ts&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'IBM Services, your Digital Reinvention ™ partner',
                imageUrl: 'https://www.ibm.com/images/portal/U609055Q90660U49/windmills.jpg',
                linkTitle: 'Explore all our business consulting and technology services',
                linkUrl: 'https://www.ibm.com/services?lnk=hpmse_ts&lnk2=learn',
              },
            },
          },
          {
            title: 'Financing',
            url: 'https://www.ibm.com/financing?lnk=hpmse_fin&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Financing',
              headingUrl: 'https://www.ibm.com/financing?lnk=hpmse_fin&lnk2=learn',
              description: 'Funding options that fit your business',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Financing solutions',
                    url: 'https://www.ibm.com/financing/solutions/it-financing-solutions?lnk=hpmse_fin',
                  },
                  {
                    title: 'Payment options',
                    url: 'https://www.ibm.com/financing/solutions/it-financing-options?lnk=hpmse_fin',
                  },
                  {
                    title: 'Services financing',
                    url: 'https://www.ibm.com/financing/solutions/it-services-financing?lnk=hpmse_fin',
                  },
                ],
              },
              feature: {
                heading: 'Cloud financing strategies that work for your business',
                imageUrl: 'https://www.ibm.com/images/portal/F774737R30303N19/Skyline-Card-cloud-feature380x160.jpg?1=1',
                linkTitle: 'Committed to cloud? Make the most of your cash flow.',
                linkUrl: 'https://www.ibm.com/financing/solutions/cloud-financing?lnk=hpmse_fin&lnk2=learn',
              },
            },
          },
          {
            title: 'Industry expertise',
            url: 'https://www.ibm.com/industries?lnk=hpmse_ie&lnk2',
            megapanelContent: {
              headingTitle: 'Industry expertise',
              headingUrl: 'https://www.ibm.com/industries?lnk=hpmse_ie&lnk2',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Banking',
                    url: 'https://www.ibm.com/industries/banking-financial-markets?lnk=hpmse_ie&lnk2=learn',
                  },
                  {
                    title: 'Retail',
                    url: 'https://www.ibm.com/industries/retail-consumer-products?lnk=hpmse_ie',
                  },
                  {
                    title: 'Telecom, Media, Entertainment',
                    url: 'https://www.ibm.com/industries/telecom-media-entertainment?lnk=hpmse_ie&lnk2=learn',
                  },
                  {
                    title: 'Government',
                    url: 'https://www.ibm.com/industries/government?lnk=hpmse_ie',
                  },
                  {
                    title: 'All industries',
                    url: 'https://www.ibm.com/industries?lnk=hpmse_ie',
                  },
                ],
              },
              feature: {
                heading: 'Industry Insiders Roundtable',
                imageUrl: 'https://www.ibm.com/services/image/Industry_Insiders_Roundtable_380x160.jpg',
                linkTitle:
                  'Five IBM experts and Business Insider CEO Henry Blodget discuss the forces transforming every industry. Even yours.',
                linkUrl: 'https://www.ibm.com/industries?lnk=hpmse_ie',
              },
            },
          },
          {
            title: 'Training and skills',
            url: 'https://www.ibm.com/training/?lnk=hpmse_tr&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Training and skills',
              headingUrl: 'https://www.ibm.com/training/?lnk=hpmse_tr&lnk2=learn',
              description: 'Start your learning journey, build expertise and get recognized',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Find learning',
                    url: 'https://www.ibm.com/training/search/?lnk=hpmse_tr&lnk2=learn',
                  },
                  {
                    title: 'Learning journeys',
                    url: 'https://www.ibm.com/training/journeys/?lnk=hpmse_tr&lnk2=learn',
                  },
                  {
                    title: 'Badges',
                    url: 'https://www.ibm.com/training/badges/?lnk=hpmse_tr&lnk2=learn',
                  },
                  {
                    title: 'My learning',
                    url: 'https://www.ibm.com/training/mylearning/?lnk=hpmse_tr&lnk2=learn',
                  },
                  {
                    title: 'Events',
                    url: 'https://www.ibm.com/training/events/?lnk=hpmse_tr&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'IBM Training and Skills blog',
                imageUrl: 'https://www.ibm.com/cloud-computing/ibmtraining_380x160.png',
                linkTitle: 'Uncover the latest thought-provoking insights into learning and skills recognition',
                linkUrl: 'https://www.ibm.com/blogs/ibm-training/?lnk=hpmse_tr&lnk2=learn',
              },
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Industries',
    url: 'https://www.ibm.com/industries?lnk=min',
    hasMenu: false,
    hasMegapanel: false,
    menuSections: [],
  },
  {
    title: 'Developers',
    url: '',
    hasMenu: true,
    hasMegapanel: true,
    menuSections: [
      {
        heading: '',
        menuItems: [
          {
            title: 'IBM Developer',
            url: 'https://developer.ibm.com/?lnk=hpmdev_dw&lnk2=learn',
            megapanelContent: {
              headingTitle: 'IBM Developer',
              headingUrl: 'https://developer.ibm.com/?lnk=hpmdev_dw&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Code patterns',
                    url: 'https://developer.ibm.com/patterns/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Tutorials',
                    url: 'https://developer.ibm.com/tutorials/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Open source',
                    url: 'https://developer.ibm.com/open/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'APIs',
                    url: 'https://developer.ibm.com/technologies/api/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Events',
                    url: 'https://developer.ibm.com/events/?lnk=hpmdev_dw&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'The future of open source',
                imageUrl: 'https://1.dam.s81c.com/m/4f377d2fdd04d2a7/original/developer-open-2020-600x245.jpg',
                linkTitle: 'See how the trends of the past decade will fuel coming innovations',
                linkUrl: 'https://developer.ibm.com/blogs/what-5-new-innovations-will-open-source-yield-in-the-2020s/',
              },
            },
          },
          {
            title: 'Blockchain',
            url: 'https://developer.ibm.com/technologies/blockchain/?lnk=hpmdev_dw&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Blockchain',
              headingUrl: 'https://developer.ibm.com/technologies/blockchain/?lnk=hpmdev_dw&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Code patterns',
                    url: 'https://developer.ibm.com/patterns/category/blockchain/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Tutorials',
                    url: 'https://developer.ibm.com/tutorials/category/blockchain/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Events',
                    url: 'https://developer.ibm.com/events/category/blockchain/?lnk=hpmdev_dw&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'Blockchain 101',
                imageUrl: 'https://www.ibm.com/images/portal/E174255N41814O86/Blockchain2_600x245.jpg?1=3',
                linkTitle: 'Build a kick-starter blockchain network and start coding with the IBM Blockchain Platform',
                linkUrl:
                  'https://developer.ibm.com/tutorials/cl-ibm-blockchain-101-quick-start-guide-for-developers-bluemix-trs/?lnk=hpmdev_dw&lnk2=learn',
              },
            },
          },
          {
            title: 'Artificial Intelligence',
            url: 'https://www.ibm.com/artificial-intelligence?lnk=hpmpr_buwa',
            megapanelContent: {
              headingTitle: 'Artificial Intelligence',
              headingUrl: 'https://www.ibm.com/artificial-intelligence?lnk=hpmpr_buwa',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Code patterns',
                    url: 'https://developer.ibm.com/patterns/category/artificial-intelligence/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Tutorials',
                    url: 'https://developer.ibm.com/tutorials/category/artificial-intelligence/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Events',
                    url: 'https://developer.ibm.com/events/category/artificial-intelligence/?lnk=hpmdev_dw&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'How well do you know AI?',
                imageUrl: 'https://www.ibm.com/images/portal/A641528I08709V86/Beginners-guide-AI_600x245.jpg?1=2',
                linkTitle: "A beginner's guide to artificial intelligence, machine learning, and cognitive computing",
                linkUrl:
                  'https://developer.ibm.com/articles/cc-beginner-guide-machine-learning-ai-cognitive/?lnk=hpmdev_dw&lnk2=learn',
              },
            },
          },
          {
            title: 'Containers',
            url: 'https://developer.ibm.com/technologies/containers/?lnk=hpmdev_dw&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Containers',
              headingUrl: 'https://developer.ibm.com/technologies/containers/?lnk=hpmdev_dw&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Code patterns',
                    url: 'https://developer.ibm.com/patterns/category/containers/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Tutorials',
                    url: 'https://developer.ibm.com/tutorials/category/containers/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Events',
                    url: 'https://developer.ibm.com/events/category/containers/?lnk=hpmdev_dw&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'Make sense of Kubernetes',
                imageUrl: 'https://www.ibm.com/images/portal/E693054G76296P64/Kubernetes-Pythomn_600x245.jpg?1=2',
                linkTitle: 'Deploy a simple Python application with Kubernetes',
                linkUrl: 'https://developer.ibm.com/tutorials/scalable-python-app-with-kubernetes/?lnk=hpmdev_dw&lnk2=learn',
              },
            },
          },
          {
            title: 'Analytics',
            url: 'https://developer.ibm.com/technologies/analytics/?lnk=hpmdev_dw&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Analytics',
              headingUrl: 'https://developer.ibm.com/technologies/analytics/?lnk=hpmdev_dw&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Code patterns',
                    url: 'https://developer.ibm.com/patterns/category/analytics/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Tutorials',
                    url: 'https://developer.ibm.com/tutorials/category/analytics/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Events',
                    url: 'https://developer.ibm.com/events/category/analytics/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Developer community',
                    url: 'https://developer.ibm.com/watson/?lnk=hpmdev_dw&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'Train your data no matter where it lives',
                imageUrl: 'https://1.dam.s81c.com/m/76c0ed6f3e6386c1/original/Train-data_600x245.jpg',
                linkTitle: 'Easily and securely connect to your data source for initial model training and continuous learning',
                linkUrl:
                  'https://developer.ibm.com/announcements/training-machine-learning-models-in-watson-studio?lnk=hpmdev_dw&lnk2=learn',
              },
            },
          },
          {
            title: 'Node.js',
            url: 'https://developer.ibm.com/technologies/node-js/?lnk=hpmdev_dw&lnk2=learn',
            megapanelContent: {
              headingTitle: 'Node.js',
              headingUrl: 'https://developer.ibm.com/technologies/node-js/?lnk=hpmdev_dw&lnk2=learn',
              description: '',
              quickLinks: {
                title: 'Quicklinks',
                links: [
                  {
                    title: 'Code patterns',
                    url: 'https://developer.ibm.com/patterns/category/node-js/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Tutorials',
                    url: 'https://developer.ibm.com/tutorials/category/node-js/?lnk=hpmdev_dw&lnk2=learn',
                  },
                  {
                    title: 'Events',
                    url: 'https://developer.ibm.com/events/category/node-js/?lnk=hpmdev_dw&lnk2=learn',
                  },
                ],
              },
              feature: {
                heading: 'Node.js tutorial series: an overview',
                imageUrl: 'https://1.dam.s81c.com/m/2294a50e4637b9c0/original/NodeDotJS_600x245.jpg?1=4',
                linkTitle: 'What should you know before you start your node journey? Start with this learning path.',
                linkUrl:
                  'https://developer.ibm.com/articles/learn-node-unit-1-overview-nodejs-learning-path/?lnk=hpmdev_dw&lnk2=learn',
              },
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Support',
    url: 'https://www.ibm.com/support/home/?lnk=msu_usen',
    hasMenu: false,
    hasMegapanel: false,
    menuSections: [],
  },
];

/* eslint-enable max-len */

export default mastheadLinks;
