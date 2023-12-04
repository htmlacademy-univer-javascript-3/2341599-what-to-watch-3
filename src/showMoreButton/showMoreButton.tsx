type ShowMoreButtonProps = {
  isDisplay: boolean;
  onClick: () => void;
}

export default function ShowMoreButton({ isDisplay, onClick }: ShowMoreButtonProps) {
  return (
    <div
      className="catalog__more"
      onClick={onClick}
      style={{ display: !isDisplay ? 'none' : 'block' }}
    >
      <button className="catalog__button" type="button">
        Show more
      </button>
    </div>
  );
}
