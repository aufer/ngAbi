export abstract class Page {
  title: string;
  content: string;
  images: string[];
  anchor: string;

  customContent: any[];

  order: number;
  isMain: boolean;
  isFooter: boolean;
}
