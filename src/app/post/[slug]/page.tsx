import { Metadata } from "next";
import { getPost } from "@/lib/getPost";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Tag } from "@/components/Tag";
import { Comments } from "@/components/Comments";
import Image from "next/image";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다 | Howu Run",
      description: "요청하신 포스트를 찾을 수 없습니다.",
    };
  }

  const canonicalUrl = `https://howurun.com/post/${slug}`;
  const thumbnailUrl = post.thumbnail || "/default-thumbnail.jpg";

  return {
    title: `${post.title} | Howu Run`,
    description: post.content.slice(0, 160),
    metadataBase: new URL("https://howurun.com"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      url: canonicalUrl,
      siteName: "Howu Run",
      images: [{ url: thumbnailUrl }],
      type: "article",
      publishedTime: post.date,
      authors: ["Howu"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content.slice(0, 160),
      images: [thumbnailUrl],
    },
    keywords: post.tags?.join(", "),
    authors: [{ name: "Howu" }],
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function getData(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  if (!post) {
    return null;
  }

  return {
    ...post,
    thumbnail: post.thumbnail || "/default-thumbnail.jpg",
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getData(slug);

  if (!post) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-xl">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mt-10 mx-auto max-w-[900px]">
        <header className="post-detail__header">
          {post.thumbnail && (
            <div className="relative flex w-full justify-center">
              <div className="relative h-[400px] w-full">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="rounded-2xl object-fit"
                  priority
                />
              </div>
            </div>
          )}

          <h1 className="text-foreground mt-[20px] text-3xl font-bold">
            {post.title}
          </h1>
          <p className="text-popover mt-[20px]">{post.date}</p>
          <ul className="mt-3 flex w-full flex-wrap gap-2">
            {post.tags?.map((tag: string) => (
              <li key={tag} className="tag">
                <Tag text={tag} />
              </li>
            ))}
          </ul>
        </header>

        <main className="post-detail__content">
          <MarkdownRenderer content={post.content} />
          <Comments />
        </main>
      </div>
    </div>
  );
}
