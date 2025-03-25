import { Metadata } from "next";
import { getPost } from "@/lib/getPost";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Tag } from "@/components/Tag";
import { Comments } from "@/components/Comments";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const post = await getPost(decodedSlug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다 | Howu Run",
      description: "요청하신 포스트를 찾을 수 없습니다.",
    };
  }

  const canonicalUrl = `https://howu.run/post/${decodedSlug}`;
  const thumbnailUrl = post.thumbnail || "/default-thumbnail.jpg";
  const description = post.content.slice(0, 160).replace(/[#*`]/g, ''); // 마크다운 특수문자 제거

  return {
    title: `${post.title} | Howu Run`,
    description,
    metadataBase: new URL("https://howu.run"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: "Howu Run",
      images: [{ 
        url: thumbnailUrl,
        width: 1200,
        height: 630,
        alt: post.title
      }],
      type: "article",
      publishedTime: post.date,
      authors: ["Howu"],
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [{
        url: thumbnailUrl,
        width: 1200,
        height: 630,
        alt: post.title
      }],
      creator: "@howu",
    },
    keywords: post.tags?.join(", "),
    authors: [{ name: "Howu" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getData(resolvedParams.slug);

  if (!post) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-xl">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.slice(0, 160).replace(/[#*`]/g, ''),
    image: post.thumbnail || "/default-thumbnail.jpg",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Howu'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Howu Run',
      logo: {
        '@type': 'ImageObject',
        url: 'https://howu.run/logo.png'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
