import "./About.css";

export function About() {
  return (
    <main>
      <section className="about">
        <div className="container">
          <div className="about__wrapper">
            <h1 className="about__title">О блоге LightBlog</h1>
            <p className="about__text">
              Добро пожаловать в lightBlog — ваш персональный уголок для
              выражения мыслей, идей и вдохновения! Наша платформа создана для
              тех, кто хочет делиться своими историями и опытом с миром.
            </p>
            <article>
              <h2 className="about__title">Что такое LightBlog?</h2>
              <p className="about__text">
                LightBlog — это простой и интуитивно понятный блог, который
                позволяет вам легко создавать, редактировать и управлять своими
                постами. Наша цель — сделать процесс написания и публикации
                контента максимально легким и доступным для всех.
              </p>
              <h2 className="about__title">Основные возможности:</h2>
              <dl className="about__list">
                <dt>
                  <strong>Добавление постов:</strong>
                </dt>
                <dd className="about__description">
                  Делитесь своими мыслями, опытом и идеями. Создавайте новые
                  посты с помощью простого редактора и наслаждайтесь творческим
                  процессом.
                </dd>

                <dt>
                  <strong>Редактирование постов:</strong>
                </dt>
                <dd className="about__description">
                  Внесите изменения в уже опубликованные статьи, чтобы улучшить
                  их или обновить информацию.
                </dd>

                <dt>
                  <strong>Удаление постов:</strong>
                </dt>
                <dd className="about__description">
                  Удалите ненужные записи в любое время, чтобы поддерживать
                  актуальность вашего блога.
                </dd>
              </dl>

              <p className="about__text about__text--last">
                LightBlog предоставляет вам все необходимые инструменты для
                создания уникального контента и взаимодействия с вашей
                аудиторией. Присоединяйтесь к нам, делитесь своими историями и
                вдохновляйте других!
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
