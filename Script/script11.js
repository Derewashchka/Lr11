document.addEventListener('DOMContentLoaded', function () {
    // Мінімальна кількість слів для перекладу
    var maxWords = 10;
    // Слова для перекладу випадковим чином
    var words = [
        { en: "always", ua: "завжди" },
        { en: "never", ua: "ніколи" },
        { en: "sometimes", ua: "іноді" },
        { en: "often", ua: "часто" },
        { en: "rarely", ua: "рідко" },
        { en: "usually", ua: "зазвичай" },
        { en: "hello", ua: "привіт" },
        { en: "goodbye", ua: "до побачення" },
        { en: "thank you", ua: "дякую" },
        { en: "sorry", ua: "вибач" }
    ];
    // Поточне слово
    var currentWord = words[0];
    // Поточний крок
    var currentStep = 1;
    // Поточна кількість вірно перекладених слів
    var correctCount = 0;
    // Поточна кількість невірно перекладених слів
    var incorrectCount = 0;
    // Поточний рівень знань мови
    var level = 0;

    // Функція для перевірки правильності перекладу
    function checkAnswer() {
        // Отримати введений переклад
        var input = $(".input").val();
        // Порівняти з правильним перекладом
        if (input == currentWord.ua) {
            // Збільшити кількість вірно перекладених слів
            correctCount++;
            // Оновити статистику
            $(".stats").text("Вірно: " + correctCount + " Невірно: " + incorrectCount + " Крок: " + currentStep + "/" + maxWords);
            // Показати повідомлення
            alert("Вірно!");
        } else {
            // Збільшити кількість невірно перекладених слів
            incorrectCount++;
            // Оновити статистику
            $(".stats").text("Вірно: " + correctCount + " Невірно: " + incorrectCount + " Крок: " + currentStep + "/" + maxWords);
            // Показати повідомлення
            alert("Невірно!");
        }
        // Очистити поле для введення
        $(".input").val("");
        // Перейти до наступного кроку
        nextStep();
    }

    // Функція для переходу до наступного кроку
    function nextStep() {
        // Збільшити поточний крок
        currentStep++;
        // Якщо поточний крок більший за мінімальну кількість слів
        if (currentStep > maxWords) {
            // Завершити застосунок
            finish();
        } else {
            // Вибрати наступне слово випадковим чином
            currentWord = words[Math.floor(Math.random() * words.length)];
            // Оновити картку
            $(".card").text(currentWord.en);
            // Оновити статистику
            $(".stats").text("Вірно: " + correctCount + " Невірно: " + incorrectCount + " Крок: " + currentStep + "/" + maxWords);
            // Оновити прогрес
            $(".bar").css("width", (currentStep - 1) / maxWords * 100 + "%");
        }
    }

    // Функція для завершення застосунку
    function finish() {
        // Обчислити рівень знань мови
        level = correctCount / maxWords * 100;
        // Оновити модальне вікно
        $(".modal-content").text("Рівень знань: " + level + "%");
        // Показати модальне вікно
        $(".modal").show();
    }

    // Додати обробник події для кнопки
    $(".button").click(checkAnswer);
});