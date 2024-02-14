// IssuesRootLayout.tsx
import { Container, Theme } from "@radix-ui/themes";

interface LayoutProps {
  children: React.ReactNode;
}

export default function IssuesRootLayout({ children }: LayoutProps) {
  return (
    <Theme>
      <Container className="max-w-full mx-auto px-4 mt-40 py-6 border-t border-gray-900">
        {children}
      </Container>
    </Theme>
  );
}
