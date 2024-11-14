import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn, googleSignIn } from '@/lib/utils';
import {
  ArrowRight,
  FileSearch,
  Hourglass,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const features = [
  {
    title: 'AI-powered Analysis',
    description:
      'Leverage advanced AI to analyze contracts quickly and accurately.',
    icon: FileSearch,
  },
  {
    title: 'Risk Identification',
    description: 'Spot potential risks and opportunities in your contracts.',
    icon: ShieldCheck,
  },
  {
    title: 'Streamlined Negotiation',
    description: 'Accelerate the negotiation process with AI-driven insights.',
    icon: Hourglass,
  },
  {
    title: 'Cost Reduction',
    description: 'Significantly reduce legal costs through automation.',
    icon: PiggyBank,
  },
  {
    title: 'Improved Compliance',
    description: 'Ensure your contracts meet all regulatory requirements.',
    icon: Scale,
  },
  {
    title: 'Faster Turnaround',
    description: 'Complete contract reviews in minutes instead of hours.',
    icon: Zap,
  },
];

export function HeroSection() {
  const { user } = useCurrentUser();

  return (
    <section className="w-full bg-gradient-to-b from-background to-background/80 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto flex max-w-6xl flex-col items-center px-4 md:px-6">
        <Link
          href={'/dashboard'}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'mb-4 hidden rounded-full px-4 py-2 md:flex'
          )}
        >
          <span className="mr-3 hidden md:block">
            <Sparkles className="size-3.5" />
          </span>
          Introducing Simple Metrics for your team
        </Link>
        <div className="mb-12 w-full text-center">
          <h1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl xl:text-6xl/none">
            Revoltionzie Your Contracts
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
            Harness the power of AI to analyze, understand, and optimize your
            contracts in no time.
          </p>

          {!user && (
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                className="inline-flex items-center justify-center text-lg"
                size={'lg'}
                onClick={googleSignIn}
              >
                Get Started
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          )}

          <div className="mb-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
