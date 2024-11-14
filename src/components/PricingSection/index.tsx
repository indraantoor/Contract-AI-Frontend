import { useCurrentUser } from '@/hooks/useCurrentUser';
import { api } from '@/lib/api';
import stripePromise from '@/lib/stripe';
import { googleSignIn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Cover } from '../ui/cover';
import { GridBackground } from '../ui/gridBackground';

export function PricingSection() {
  const { user } = useCurrentUser();

  const handleUpgrade = async () => {
    try {
      if (!user) {
        googleSignIn();
        return;
      }
      const response = await api.get('/payments/create-checkout-session');
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GridBackground>
      <div className="container mx-auto px-4 py-16">
        <h2 className="bg-white text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Choose the plan that&apos;s <Cover>right for you.</Cover>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl bg-white text-center text-lg text-muted-foreground">
          Select the perfect plan for your needs. Upgrade anytime to unlock
          premium features and support.
        </p>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          <PricingCard
            title="Basic"
            description="For comprehensive contract analysis"
            price="Free"
            period="/lifetime"
            features={[
              'Advanced contract analysis',
              'Unlimited projects',
              'Chat with your contract',
              '10+ risks with severity levels',
              '10+ opportunities with impact levels',
              'Comprehensive contract summary',
              'Improvement recommendations',
              'Key clauses identification',
              'Legal compliance assessment',
              'Negotiation points',
              'Contract duration analysis',
              'Termination conditions summary',
              'Compensation structure breakdown',
              'Performance metrics identification',
              'Intellectual property clause summary',
            ]}
            buttonText="Upgrade"
            onButtonClick={handleUpgrade}
          />
          <PricingCard
            title="Premium"
            description="For comprehensive contract analysis"
            price="$100"
            highlight
            period="/lifetime"
            features={[
              'Advanced contract analysis',
              'Unlimited projects',
              'Chat with your contract',
              '10+ risks with severity levels',
              '10+ opportunities with impact levels',
              'Comprehensive contract summary',
              'Improvement recommendations',
              'Key clauses identification',
              'Legal compliance assessment',
              'Negotiation points',
              'Contract duration analysis',
              'Termination conditions summary',
              'Compensation structure breakdown',
              'Performance metrics identification',
              'Intellectual property clause summary',
            ]}
            buttonText="Upgrade"
            onButtonClick={handleUpgrade}
          />
        </div>
      </div>
    </GridBackground>
  );
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
  onButtonClick: () => void;
}

function PricingCard({
  title,
  description,
  price,
  features,
  period,
  buttonText,
  highlight,
  onButtonClick,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col ${
        highlight ? 'border-primary shadow-lg' : ''
      } relative overflow-hidden transition-all duration-300`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-6 text-5xl font-extrabold">
          {price}
          <span className="text-base font-normal text-muted-foreground">
            {period}
          </span>
        </p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li className="flex items-center gap-2" key={index}>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={highlight ? 'default' : 'outline'}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
