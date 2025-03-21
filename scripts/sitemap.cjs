const fs = require('fs');
const path = require('path');

// 날짜 형식 변환 함수
function formatDate(dateString) {
    // 날짜 문자열에서 "월", "일", "년"을 정규식으로 처리
    const regex = /(\d{4})월 (\d{2})일 (\d{2}):(\d{2})/;
    const match = dateString.match(regex);

    if (match) {
        const year = match[1];
        const month = match[2];
        const day = match[3];
        const hour = match[4];
        const minute = match[5];

        // "YYYY-MM-DDTHH:MM:SS" 형태로 변환
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
    }

    // 유효하지 않은 형식일 경우 기본 값으로 현재 날짜 반환
    return new Date();
}

// sitemap.txt, sitemap.xml 생성 함수
async function generateSitemap() {
    try {
        // postMetas.json 파일 읽기
        const postMetasPath = path.join(process.cwd(), 'public', 'postsMeta.json');
        const postMetasData = fs.readFileSync(postMetasPath, 'utf8');
        const posts = JSON.parse(postMetasData);

        // 기본 URL 설정
        const baseUrl = 'https://howu.run';

        // 기본 경로 설정
        let routes = [
            '/'
        ];

        // 모든 블로그 포스트 경로 추가
        posts.forEach(post => {
            const slug = encodeURIComponent(post.title);
            routes.push(`/post/${slug}`);
        });

        // sitemap.txt 생성
        const sitemapTxt = routes.map(route => `${baseUrl}${route}`).join('\n');
        fs.writeFileSync(
            path.join(process.cwd(), 'public', 'sitemap.txt'),
            sitemapTxt
        );
        console.log('✅ sitemap.txt generated successfully!');

        // sitemap.xml 생성
        let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        routes.forEach(route => {
            const post = posts.find(p => `/post/${encodeURIComponent(p.title)}` === route);
            const lastModifiedDate = post && post.date ? formatDate(post.date) : new Date();

            // 유효한 날짜인지 확인
            if (isNaN(lastModifiedDate)) {
                console.warn(`❌ Invalid date for post: ${post ? post.title : route}. Using current date.`);
            }

            sitemapXml += `  <url>\n`;
            sitemapXml += `    <loc>${baseUrl}${route}</loc>\n`;
            sitemapXml += `    <lastmod>${lastModifiedDate.toISOString()}</lastmod>\n`;
            sitemapXml += `    <changefreq>weekly</changefreq>\n`;
            sitemapXml += `    <priority>0.5</priority>\n`;
            sitemapXml += `  </url>\n`;
        });

        sitemapXml += '</urlset>';

        fs.writeFileSync(
            path.join(process.cwd(), 'public', 'sitemap.xml'),
            sitemapXml
        );
        console.log('✅ sitemap.xml generated successfully!');

        // dist 폴더가 존재하는지 확인 후 복사
        const distPath = path.join(process.cwd(), 'dist');
        if (fs.existsSync(distPath)) {
            fs.writeFileSync(
                path.join(distPath, 'sitemap.txt'),
                sitemapTxt
            );
            fs.writeFileSync(
                path.join(distPath, 'sitemap.xml'),
                sitemapXml
            );
        }

        console.log('✅ Files successfully copied to dist folder!');
        console.log(`Total URLs: ${routes.length}`);
    } catch (error) {
        console.error('❌ Error generating files:', error);
    }
}

// 스크립트 실행
generateSitemap();
