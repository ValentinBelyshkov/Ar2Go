import './FooterButton.scss';

export const FooterButton = ({ children, onClick }) => {
  return (
    <button className="footer-button" onClick={onClick}>{children}</button>
  );
}