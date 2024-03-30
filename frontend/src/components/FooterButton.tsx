import './FooterButton.scss';

export const FooterButton = ({ children, onClick }: { children: string | JSX.Element | JSX.Element[], onClick: () => void }) => {
  return (
    <button className="footer-button" onClick={onClick}>{children}</button>
  );
}