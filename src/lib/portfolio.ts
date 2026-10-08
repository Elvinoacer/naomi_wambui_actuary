/**
 * Naomi Wambui — Actuarial Science Graduate Portfolio
 * Content data layer. Follows the portfolio specification.
 *
 * NOTE (placeholder policy): This portfolio is a demonstration profile.
 * Entries flagged `verified: false` contain example content that should be
 * replaced with real, verified information before publication — see the
 * publishing checklist in the project README.
 */

export type Proficiency = "strong" | "working" | "exposure" | "learning";

export const PROFICIENCY_LABELS: Record<Proficiency, string> = {
  strong: "Strong",
  working: "Working Knowledge",
  exposure: "Academic Exposure",
  learning: "Currently Learning",
};

export const profile = {
  fullName: "Naomi Wambui",
  firstName: "Naomi",
  professionalTitle: "Graduate Actuarial Analyst",
  eyebrow: "Moi University · BSc Actuarial Science",
  headline: "Actuarial Science Graduate focused on Risk Modelling, Insurance Analytics & Financial Mathematics.",
  headlineSegments: [
    "Actuarial Science Graduate focused on",
    "Risk Modelling,",
    "Insurance Analytics",
    "& Financial Mathematics.",
  ],
  supporting:
    "I use mathematics, statistics and data to understand uncertainty and support better financial decisions. My background spans probability, insurance mathematics, financial modelling, survival analysis, risk theory and quantitative analytics.",
  availability:
    "Open to graduate actuarial, insurance, risk, analytics and financial modelling opportunities.",
  location: "Kenya",
  email: "naomi.wambui@example.com", // placeholder — replace before publishing
  linkedin: "https://www.linkedin.com/in/naomi-wambui", // placeholder — replace before publishing
  graduationYear: 2026,
  valueProposition:
    "Moi University Actuarial Science graduate with strong academic foundations in probability, statistics, financial mathematics, stochastic processes, survival models, insurance mathematics, pensions, economics and data analysis — with the ability to model uncertainty, analyse risk, build defensible assumptions and communicate findings that support evidence-based decisions.",
  philosophy: {
    short: "Understand the risk. Question the assumptions. Model uncertainty. Validate the result. Explain the decision clearly.",
    expanded:
      "I see actuarial work as the discipline of making responsible decisions under uncertainty. Good modelling requires sound mathematics, realistic assumptions, high-quality data, careful validation and clear communication of what the results do — and do not — mean.",
    principles: [
      {
        step: "01",
        title: "Understand the risk",
        body: "Every model begins with a business question. What event are we pricing, reserving for, or hedging against? Framing the risk correctly matters more than the elegance of the mathematics that follows.",
      },
      {
        step: "02",
        title: "Question the assumptions",
        body: "Assumptions are where models succeed or quietly fail. I stress-test the inputs — mortality rates, inflation, discount curves, exposure — before trusting the outputs they produce.",
      },
      {
        step: "03",
        title: "Model uncertainty",
        body: "A single number is rarely an answer. Distributions, scenarios and confidence ranges describe reality far better than a point estimate ever can.",
      },
      {
        step: "04",
        title: "Validate the result",
        body: "Residuals, out-of-sample tests, calibration plots — validation is how a model earns credibility. A model that cannot be checked cannot be defended.",
      },
      {
        step: "05",
        title: "Explain the decision",
        body: "Analysis only matters when a decision-maker can act on it. I aim to communicate technical findings in language that is precise, honest and useful.",
      },
    ],
  },
};

export const snapshot = [
  { label: "Degree", value: "BSc Actuarial Science", detail: "Moi University" },
  { label: "Graduation", value: "2026", detail: "Class of" },
  { label: "Focus", value: "Insurance · Risk", detail: "Financial Modelling" },
  { label: "Quant Projects", value: "7", detail: "Coursework & applied" },
  { label: "Core Tools", value: "Excel · R", detail: "Python · SQL" },
  { label: "Location", value: "Kenya", detail: "Open to relocation" },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface Project {
  slug: string;
  title: string;
  category: string;
  categoryColor: "risk" | "actuary" | "sens";
  tagline: string;
  image?: string;
  imageAlt?: string;
  /** Optional object-position for the cover crop — keeps faces in frame. */
  imagePosition?: string;
  summary: string;
  problem: string;
  approach: string[];
  evidence: string[];
  tools: string[];
  metric?: { label: string; value: string };
  accent: "risk" | "actuary" | "sens";
}

export const featuredProject: Project = {
  slug: "motor-claims-modelling",
  title: "Motor Insurance Claims Frequency & Severity Modelling",
  category: "Final-Year Project · Insurance / Risk",
  categoryColor: "risk",
  tagline:
    "Separate models for how often claims occur and how large they become — combined into expected claim cost across policyholder segments.",
  image: "/images/motor-insurance.jpg",
  imageAlt:
    "Aerial night view of a highway interchange with moving traffic light trails",
  summary:
    "This project analyses motor insurance claims using separate models for claim frequency and claim severity, then combines the results to estimate expected claim cost across policyholder segments. The goal is not only to predict claims, but to understand the underlying risk structure.",
  problem:
    "Insurers need to understand how often claims occur, how large they become, which policyholder characteristics drive risk, and how expected losses vary across segments. A single blended model hides these effects — frequency and severity behave differently and deserve separate treatment.",
  approach: [
    "Cleaned and validated the claims dataset: exposure windows, missing values, outlier review, anonymisation.",
    "Explored claim frequency against driver age, vehicle age, region and vehicle type.",
    "Fitted Poisson and Negative Binomial GLMs for counts, with a log-exposure offset so that policies observed for partial years are weighted correctly.",
    "Modelled severity (Claim Amount | Claim > 0) with Gamma and Lognormal candidates — severity is right-skewed, so normal-theory models are inappropriate.",
    "Combined expected frequency × expected severity into a pure-premium view per segment.",
    "Compared models with AIC, deviance and residual diagnostics; checked stability across segments.",
  ],
  evidence: [
    "Frequency model with exposure offset — because 0.5 years of cover is not the same risk as a full year.",
    "Negative Binomial preferred over Poisson once overdispersion was confirmed in the data.",
    "Right-skewed severity handled with Gamma / Lognormal distributions rather than normal approximations.",
    "Risk segments ranked by expected loss cost to show where pricing attention should focus.",
  ],
  tools: ["R", "GLMs", "Poisson", "Negative Binomial", "Gamma", "Lognormal", "AIC"],
  metric: { label: "Expected Loss Cost", value: "E[Frequency] × E[Severity]" },
  accent: "risk",
};

export const projects: Project[] = [
  {
    slug: "life-premium-model",
    title: "Life Insurance Premium Model",
    category: "Life Insurance",
    categoryColor: "actuary",
    tagline:
      "Net premium calculation from mortality assumptions, discount rates and a defined benefit structure.",
    image: "/images/life-insurance.jpg",
    imageAlt: "Young family walking hand-in-hand through a golden field at sunset",
    summary:
      "A term-life premium model built on mortality assumptions, a chosen discount rate and a defined benefit structure — with sensitivity analysis showing how the premium responds when the assumptions move.",
    problem:
      "What should a fair premium be when the cost of the promise depends on when the insured life ends and what money earns in the meantime? Premium calculation forces every assumption into the open.",
    approach: [
      "Selected a mortality basis and applied survival probabilities from life-table functions.",
      "Discounted the expected benefit stream using the interest basis to present value.",
      "Derived the net premium from the equivalence principle: expected present value of premiums = expected present value of benefits.",
      "Stressed mortality rates and the discount rate to measure premium sensitivity.",
    ],
    evidence: [
      "Mortality assumption with survival probabilities",
      "Discount rate & benefit structure",
      "Equivalence-principle premium model",
      "One-way sensitivity analysis on key assumptions",
    ],
    tools: ["Excel", "Life Tables", "Present Value", "Sensitivity Analysis"],
    accent: "actuary",
  },
  {
    slug: "pension-projection",
    title: "Pension Projection Model",
    category: "Pensions",
    categoryColor: "sens",
    tagline:
      "Projecting a retirement fund from contributions, salary growth and investment returns — under multiple scenarios.",
    image: "/images/pension.jpg",
    imageAlt: "Happy senior couple reviewing a map together outdoors in sunshine",
    summary:
      "A long-horizon cashflow model projecting fund value at retirement from salary growth, contribution rates and investment return assumptions, compared across optimistic, base and conservative scenarios.",
    problem:
      "Retirement outcomes are decided decades in advance by three quiet assumptions — salary growth, contributions and investment return. The model makes their long-term consequences visible.",
    approach: [
      "Modelled salary growth and contributions year by year over the accumulation phase.",
      "Applied investment return assumptions to project the fund value to retirement age.",
      "Ran scenario comparisons — conservative, base and optimistic returns.",
      "Measured how a 1% change in return assumptions shifts the projected fund value.",
    ],
    evidence: [
      "Year-by-year accumulation cashflows",
      "Three-scenario comparison",
      "Retirement fund value projections",
      "Longevity risk discussion",
    ],
    tools: ["Excel", "Cashflow Modelling", "Scenario Analysis"],
    accent: "sens",
  },
  {
    slug: "claims-reserving",
    title: "Claims Reserving Triangle",
    category: "General Insurance",
    categoryColor: "risk",
    tagline:
      "Estimating ultimate claims and reserves from a development triangle of incurred losses.",
    summary:
      "A chain-ladder style exercise: building a claims development triangle, computing age-to-age factors, projecting cumulative development and deriving an ultimate-claims and reserve estimate.",
    problem:
      "Claims from past accident periods are not yet fully settled. How much should be held today for claims that have happened but not finished developing?",
    approach: [
      "Arranged incurred claims by accident period and development month into a run-off triangle.",
      "Computed age-to-age development factors and cumulative development factors.",
      "Projected the lower half of the triangle to ultimate claims.",
      "Derived the reserve estimate as ultimate minus paid-to-date, with diagnostic commentary.",
    ],
    evidence: [
      "Development triangle construction",
      "Age-to-age factor selection",
      "Ultimate claims projection",
      "Reserve estimate with limitations",
    ],
    tools: ["Excel", "Chain Ladder", "Development Factors"],
    accent: "risk",
  },
  {
    slug: "survival-analysis",
    title: "Survival Analysis Study",
    category: "Survival / Statistics",
    categoryColor: "actuary",
    tagline:
      "Time-to-event modelling applied to policy lapse and retention behaviour.",
    image: "/images/survival-analysis.jpg",
    imageAlt: "Analysts reviewing survival data visualisations on a large screen",
    imagePosition: "78% 50%",
    summary:
      "Applying survival-model thinking to policyholder behaviour: survival functions, hazard rates and how retention patterns differ across customer cohorts.",
    problem:
      "When customers leave is as important as whether they leave. Survival analysis handles censored observation periods honestly instead of discarding incomplete histories.",
    approach: [
      "Defined the event of interest and handled right-censored observations correctly.",
      "Estimated survival functions and compared cohorts.",
      "Interpreted hazard rates as instantaneous event risk.",
      "Connected the analysis to retention strategy and lifetime value.",
    ],
    evidence: [
      "Survival function estimation",
      "Hazard-rate interpretation",
      "Cohort comparison",
      "Retention implications",
    ],
    tools: ["R", "Survival Models", "Kaplan-Meier thinking"],
    accent: "actuary",
  },
  {
    slug: "portfolio-risk",
    title: "Investment Portfolio Risk Analysis",
    category: "Financial Risk",
    categoryColor: "sens",
    tagline:
      "Returns, volatility, correlation and the diversification they enable.",
    image: "/images/investment-risk.jpg",
    imageAlt: "Close-up of a computer screen displaying candlestick market charts",
    summary:
      "A quantitative study of portfolio risk: computing returns and volatility, estimating correlations between assets, and demonstrating how diversification shapes the risk-return trade-off under stress scenarios.",
    problem:
      "Risk is not just volatility — it is the interaction of positions. Correlation, not individual volatility, decides how a portfolio behaves when markets move together.",
    approach: [
      "Computed historical returns and volatility for a set of assets.",
      "Estimated the correlation structure between asset pairs.",
      "Constructed example portfolios to show diversification effects.",
      "Ran scenario analysis to observe behaviour under market stress.",
    ],
    evidence: [
      "Return & volatility statistics",
      "Correlation matrix",
      "Diversification comparison",
      "Stress-scenario discussion",
    ],
    tools: ["Excel", "Python", "Statistics", "Scenario Analysis"],
    accent: "sens",
  },
  {
    slug: "analytics-dashboard",
    title: "Insurance Analytics Dashboard",
    category: "Data / BI",
    categoryColor: "risk",
    tagline:
      "Turning policy and claims data into monitored KPIs a business can act on.",
    image: "/images/analytics-dashboard.jpg",
    imageAlt: "Modern analytics dashboard interface with charts and KPI cards",
    summary:
      "A reporting layer for insurance portfolios: premium, claims, loss ratio, average severity and policy counts tracked over time — designed so trends and deteriorations are visible at a glance.",
    problem:
      "Raw policy and claims tables hide the signals. A dashboard exists to surface loss-ratio drift, severity trends and mix shifts before they become surprises.",
    approach: [
      "Defined the KPI set with business users in mind: loss ratio, frequency, severity, retention.",
      "Cleaned and joined policy, exposure and claims data.",
      "Built visual trend views with clear definitions of every metric.",
      "Documented metric logic so numbers are reproducible and auditable.",
    ],
    evidence: [
      "KPI definitions & calculations",
      "Loss ratio trending",
      "Portfolio mix views",
      "Reproducible data preparation",
    ],
    tools: ["Excel", "SQL", "Data Visualization"],
    accent: "risk",
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience = {
  role: "Actuarial & Risk Attachment",
  org: "Insurance industry attachment, Kenya",
  period: "2025 · Example placement",
  summary:
    "A practical attachment providing first-hand exposure to how actuarial work supports insurance operations — from data preparation to reporting workflows.",
  bullets: [
    "Assisted with data cleaning and consistency checks on policy and claims extracts.",
    "Updated and extended Excel models used for routine reporting.",
    "Prepared summary statistics and charts for team review meetings.",
    "Supported claims analysis and observed reserving and pricing workflows.",
    "Learned confidentiality, data-governance and documentation practices firsthand.",
  ],
  meta: [
    { label: "Environment", value: "General insurance operations" },
    { label: "Focus", value: "Data preparation · Reporting · Observation" },
    { label: "Status", value: "Example placement content" },
  ],
};

/* ------------------------------------------------------------------ */
/* Actuarial capability areas                                          */
/* ------------------------------------------------------------------ */

export const capabilities = [
  {
    id: "insurance-mathematics",
    index: "01",
    title: "Insurance Mathematics",
    description:
      "The core machinery of life-contingent promises: valuing benefits, pricing premiums and holding reserves that keep obligations credible.",
    items: ["Premiums", "Present values", "Annuities", "Life contingencies", "Policy values", "Reserves"],
    accent: "risk" as const,
  },
  {
    id: "risk-modelling",
    index: "02",
    title: "Risk Modelling",
    description:
      "Decomposing uncertainty into frequency and severity, then aggregating: distributions, simulation and the scenarios that stress an assumption.",
    items: ["Frequency & severity", "Aggregate loss", "Distributions", "Monte Carlo", "Scenario analysis"],
    accent: "actuary" as const,
  },
  {
    id: "survival-models",
    index: "03",
    title: "Survival & Mortality Models",
    description:
      "Modelling time-to-event data — mortality, lapse and retention — where hazard rates and life tables translate lives into probabilities.",
    items: ["Survival functions", "Hazard rates", "Life tables", "Mortality", "Expected future lifetime"],
    accent: "sens" as const,
  },
  {
    id: "pensions",
    index: "04",
    title: "Pensions & Long-Term Benefits",
    description:
      "Long-horizon promises: contributions, discounting and funding under longevity risk, where a 1% assumption moves outcomes by decades.",
    items: ["Contributions & benefits", "Discounting", "Funding", "Longevity risk", "Retirement cashflows"],
    accent: "risk" as const,
  },
  {
    id: "financial-mathematics",
    index: "05",
    title: "Financial Mathematics",
    description:
      "The time value of money as a modelling discipline: interest theory, duration, and the valuation of uncertain cashflow streams.",
    items: ["Interest theory", "Bond valuation", "Duration", "Cashflow valuation", "Investment return"],
    accent: "actuary" as const,
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  level: Proficiency;
}

export const skillGroups: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Probability & Statistics",
    blurb: "The statistical spine of actuarial judgement.",
    skills: [
      { name: "Probability distributions", level: "strong" },
      { name: "Expectation & variance", level: "strong" },
      { name: "Conditional probability", level: "strong" },
      { name: "Statistical inference", level: "working" },
      { name: "Regression", level: "working" },
      { name: "Confidence intervals", level: "working" },
      { name: "Hypothesis testing", level: "working" },
      { name: "Time series", level: "working" },
    ],
  },
  {
    group: "Actuarial Mathematics",
    blurb: "From interest theory to life contingencies.",
    skills: [
      { name: "Interest theory", level: "strong" },
      { name: "Annuities", level: "strong" },
      { name: "Life contingencies", level: "working" },
      { name: "Survival models", level: "working" },
      { name: "Reserve concepts", level: "working" },
      { name: "Premium calculations", level: "working" },
      { name: "Pension mathematics", level: "working" },
    ],
  },
  {
    group: "Risk Modelling",
    blurb: "Quantifying the frequency and cost of adverse events.",
    skills: [
      { name: "Scenario analysis", level: "strong" },
      { name: "Sensitivity analysis", level: "strong" },
      { name: "Frequency/severity models", level: "working" },
      { name: "Monte Carlo simulation", level: "working" },
      { name: "Aggregate loss", level: "working" },
      { name: "Risk measures", level: "exposure" },
    ],
  },
  {
    group: "Data Analysis",
    blurb: "Turning raw data into defensible conclusions.",
    skills: [
      { name: "Data cleaning", level: "strong" },
      { name: "Exploratory analysis", level: "strong" },
      { name: "Visualisation", level: "strong" },
      { name: "Statistical reporting", level: "strong" },
      { name: "Regression", level: "working" },
      { name: "Model interpretation", level: "working" },
    ],
  },
];

export const tools = [
  { name: "Microsoft Excel", level: "strong" as Proficiency, detail: "Financial models · Pivot tables · Solver · Sensitivity tables" },
  { name: "R", level: "working" as Proficiency, detail: "Distributions · Regression · Survival analysis · Visualisation" },
  { name: "Python", level: "working" as Proficiency, detail: "pandas · NumPy · matplotlib · scipy" },
  { name: "SQL", level: "working" as Proficiency, detail: "Querying · Joining · Aggregating policy & claims data" },
];

export const toolMarquee = [
  "Excel", "R", "Python", "SQL", "pandas", "NumPy", "matplotlib", "scipy",
  "statsmodels", "GLMs", "Pivot Tables", "Solver", "Sensitivity Analysis",
  "Scenario Analysis", "Monte Carlo", "Life Tables", "Chain Ladder",
  "Kaplan-Meier", "Data Visualisation", "Statistical Reporting",
];

/* ------------------------------------------------------------------ */
/* Professional exams                                                  */
/* ------------------------------------------------------------------ */

export const examBodies = ["IFoA — Institute and Faculty of Actuaries", "SOA — Society of Actuaries", "CAS — Casualty Actuarial Society"];

export const exams = [
  {
    code: "CS1",
    name: "Actuarial Statistics",
    body: "IFoA",
    status: "preparing" as const,
    note: "Probability & statistical methods — the analytical core.",
  },
  {
    code: "CM1",
    name: "Actuarial Mathematics",
    body: "IFoA",
    status: "planned" as const,
    note: "Financial mathematics and life contingencies.",
  },
];

export const examStatusMeta = {
  preparing: { label: "Preparing", tone: "actuary" as const },
  planned: { label: "Planned", tone: "sens" as const },
  passed: { label: "Passed", tone: "risk" as const },
  exempted: { label: "Exempted", tone: "risk" as const },
};

export const examDisclaimer =
  "Exam progress is shown honestly: no exam is listed as passed until verified. Professional qualification is a journey — this portfolio shows the foundations being built along the way.";

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const education = {
  institution: "Moi University",
  degree: "Bachelor of Science in Actuarial Science",
  period: "2022 – 2026",
  location: "Eldoret, Kenya",
  courseGroups: [
    {
      title: "Actuarial Mathematics",
      courses: ["Financial Mathematics", "Life Contingencies", "Survival Models", "Actuarial Mathematics", "Pension Mathematics", "Risk Theory"],
    },
    {
      title: "Probability & Statistics",
      courses: ["Probability Theory", "Mathematical Statistics", "Regression", "Stochastic Processes", "Time Series", "Statistical Modelling"],
    },
    {
      title: "Finance & Economics",
      courses: ["Microeconomics", "Macroeconomics", "Corporate Finance", "Investment", "Financial Economics", "Accounting Fundamentals"],
    },
    {
      title: "Data & Computing",
      courses: ["Statistical Computing", "R", "Python", "Database Fundamentals", "Data Analysis"],
    },
    {
      title: "Mathematics",
      courses: ["Calculus", "Linear Algebra", "Differential Equations", "Numerical Methods", "Optimization"],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

export const timeline = [
  {
    year: "2022",
    title: "Mathematical Foundations",
    body: "Probability, calculus, statistics and economics — building the quantitative base everything else stands on.",
  },
  {
    year: "2023",
    title: "Financial & Statistical Modelling",
    body: "Financial mathematics, regression and statistical methods — learning to connect theory to data.",
  },
  {
    year: "2024",
    title: "Actuarial Risk",
    body: "Life contingencies, survival models and insurance mathematics — the heart of the discipline.",
  },
  {
    year: "2025",
    title: "Applied Analytics",
    body: "Practical exposure to insurance, finance and quantitative data — seeing how models serve decisions.",
  },
  {
    year: "2026",
    title: "Final-Year Project & Graduation",
    body: "A major actuarial modelling project, completed and defended — and preparation for graduate roles.",
  },
];

export const currentlyLearning = [
  "Generalized Linear Models",
  "Credibility theory",
  "Claims reserving",
  "Survival analysis",
  "Stochastic modelling",
  "Python",
  "R",
  "SQL",
  "Power BI",
  "IFoA professional exams",
  "IFRS 17 fundamentals",
  "Solvency & capital concepts",
  "Machine learning for insurance",
];

/* ------------------------------------------------------------------ */
/* Recruiter summary                                                   */
/* ------------------------------------------------------------------ */

export const recruiter = {
  headline: "The 30-second version",
  coreFocus: "Insurance Risk · Financial Mathematics · Data Analytics",
  strongestEvidence: [
    "Motor claims frequency & severity modelling (final-year project)",
    "Life insurance premium model",
    "Claims reserving exercise",
    "Pension projection model",
    "Industry attachment exposure",
  ],
  targetRoles: [
    "Graduate Actuarial Analyst",
    "Actuarial Intern",
    "Pricing Analyst",
    "Reserving Analyst",
    "Risk Analyst",
    "Pensions Analyst",
    "Insurance Analyst",
    "Data Analyst",
    "Quantitative Analyst",
  ],
  availability: "Open to actuarial, risk, insurance and analytics graduate roles.",
};

export const navLinks = [
  { href: "#snapshot", label: "Snapshot" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#featured", label: "Flagship" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#about", label: "About" },
];
