import Header from '../Header';

export default function HeaderExample() {
  return (
    <div>
      <Header 
        cartCount={3} 
        isAuthenticated={true}
        userName="Sarah"
        onAuthClick={() => console.log('Auth clicked')}
      />
      <div className="p-8 bg-background">
        <p className="text-muted-foreground text-center">
          Scroll down to see more content below the sticky header
        </p>
        <div className="h-[2000px]" />
      </div>
    </div>
  );
}
