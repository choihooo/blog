import fs from "fs";
import path from "path";

// JSON 파일 경로 수정
const filePath = path.join(process.cwd(), "public/postsMeta.json");

// 파일이 존재하는지 확인
if (!fs.existsSync(filePath)) {
    console.error("❌ 파일을 찾을 수 없습니다:", filePath);
    process.exit(1);
}

// JSON 파일 읽기
const rawData = fs.readFileSync(filePath, "utf-8");
const posts = JSON.parse(rawData);

// 시리즈별 데이터 정리 (undefined인 시리즈는 제외)
const seriesData = posts
    .filter(post => post.series) // series가 undefined가 아닌 경우만 필터링
    .reduce((acc, post) => {
        const { series, date, thumbnail } = post;

        if (!acc[series]) {
            acc[series] = {
                count: 0,
                latest_date: date,
                first_thumbnail: thumbnail,
            };
        }

        acc[series].count += 1;

        // 최신 날짜 업데이트
        if (new Date(date) > new Date(acc[series].latest_date)) {
            acc[series].latest_date = date;
        }

        return acc;
    }, {});

// JSON 결과 파일로 저장
const outputFilePath = path.join(process.cwd(), "public/seriesMeta.json");
fs.writeFileSync(outputFilePath, JSON.stringify(seriesData, null, 2), "utf-8");

console.log("✅ 시리즈 데이터가 생성되었습니다:", outputFilePath); 