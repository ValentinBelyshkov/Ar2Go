import './Header.scss';

export const Header = ({ children, height }) => {
  return (
    <header style={{ height }}>
      { children }
    </header>
  )
}