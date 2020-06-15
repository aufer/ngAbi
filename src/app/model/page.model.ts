import {CtfRichContent} from "./utils";

export abstract class Page {
  title: string;
  content: CtfRichContent[];
  images: string[];
  anchor: string;

  customContent: any[];

  order: number;
  isMain: boolean;
  isFooter: boolean;
}
