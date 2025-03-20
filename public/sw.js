if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')  // 서비스 워커 파일의 경로
            .then(registration => {
                console.log('Service Worker 등록 성공:', registration);
            })
            .catch(error => {
                console.error('Service Worker 등록 실패:', error);
            });
    });
}
