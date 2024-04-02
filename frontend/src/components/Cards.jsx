import styles from './Cards.module.css';
import Card from './Card';

function Cards({ notes }) {

  return (
      <div className={styles.cards}>
        {notes && notes.length ? notes.map(({ id, title, content, Categories }) => {
          return <Card key={id}
            id={id}
            title={title}
            content={content}
            categories={Categories}
          />
        }) : null}
      </div>
  );
};

export default Cards;
