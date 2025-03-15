const fs = require('fs');
const path = require('path');

// 📌 HTML 파일이 저장된 디렉토리
const directoryPath = path.join(__dirname, 'allscamalerts');
const baseUrl = 'https://juinlaw.github.io/allscamalerts';

// 현재 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getFormattedDate(date) {
    return date.toISOString().split('T')[0];
}

// sitemap.xml 생성 함수
function generateSitemap() {
    let urls = [];
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(directoryPath, file);
            
            // 파일이 존재하는지 확인
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                const lastModified = getFormattedDate(stats.mtime); // 파일의 마지막 수정 날짜

                urls.push(`
    <url>
        <loc>${baseUrl}/${file}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`);
            }
        }
    });

    // 파일이 비어있는 경우 기본 사이트맵 추가
    if (urls.length === 0) {
        urls.push(`
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${getFormattedDate(new Date())}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>`);
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent, 'utf8');
    console.log('✅ sitemap.xml이 성공적으로 생성되었습니다.');
}

// 실행
generateSitemap();
