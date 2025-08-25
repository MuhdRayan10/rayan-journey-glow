declare module '@/data/journey-data.json' {
  interface JourneyRow {
    title: string;
    description: string;
    photostack: string[];
  }

  interface JourneySection {
    section: string;
    tags: string[];
    rows: JourneyRow[];
  }

  interface JourneyData {
    sections: JourneySection[];
  }

  const journeyData: JourneyData;
  export default journeyData;
}
