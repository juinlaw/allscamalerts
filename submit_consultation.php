<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 입력 데이터 받기
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    // 이메일 수신자 (법무법인 주인 상담 메일)
    $to = "megadeal@juinlaw.com";
    $subject = "[상담 신청] 새로운 상담 요청";
    
    // 이메일 본문 작성
    $body = "
    ===== 고객 상담 신청 =====
    연락처: $phone

    상담 내용:
    $message
    =====================
    ";

    // 이메일 헤더 설정
    $headers = "From: no-reply@juinlaw.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 이메일 전송
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>
                alert('상담 신청이 성공적으로 접수되었습니다.');
                window.location.href = 'index.html'; // 메인 페이지로 이동
              </script>";
    } else {
        echo "<script>
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                window.history.back();
              </script>";
    }
} else {
    // 잘못된 접근 차단
    header("Location: index.html");
    exit();
}
?>
