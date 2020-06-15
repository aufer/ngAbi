import {CtfRichContent} from "./utils";

export class Article {
  title: string;
  created: string;
  anchor: string;
  content: CtfRichContent[];
  image: {url: string, title: string};
}
