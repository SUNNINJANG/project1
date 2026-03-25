import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const trendsDirectory = path.join(process.cwd(), "content/trends");

export interface TrendPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  image: string;
  content: string;
}

export function getAllTrends(): TrendPost[] {
  if (!fs.existsSync(trendsDirectory)) return [];

  const fileNames = fs.readdirSync(trendsDirectory).filter((f) => f.endsWith(".md"));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(trendsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      summary: data.summary || "",
      category: data.category || "General",
      tags: data.tags || [],
      image: data.image || "",
      content,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getTrendBySlug(slug: string): Promise<TrendPost | null> {
  const fullPath = path.join(trendsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkGfm).use(html).process(content);

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    summary: data.summary || "",
    category: data.category || "General",
    tags: data.tags || [],
    image: data.image || "",
    content: processedContent.toString(),
  };
}
