const Container = ({ 
  children, 
  className = '', 
  size = 'xl',
  as: Component = 'div',
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
