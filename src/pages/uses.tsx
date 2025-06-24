import { Card, Section, SimpleLayout } from '../lib';

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" to={href} external>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I'm being productive when I'm really just procrastinating. Here's a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="16” MacBook Pro, M4 Pro, 48GB RAM (2024)">
            I was using an Intel-based 16” MacBook Pro prior to this and the
            difference is night and day. I've never heard the fans turn on a
            single time, even under the incredibly heavy loads I put it through
            with our various launch simulations.
          </Tool>
          <Tool title="Dual Dell S2722QC 4K Monitors">
            I have my laptop on a stand in the center and use it as my primary
            monitor. The two Dell monitors are on either side and I use them for
            reference material, email, and Slack.
          </Tool>
          <Tool title="Apple Magic Keyboard with Numeric Keypad">
            I used to use an Apple Magic Keyboard without the number pad but,
            after a few years of that, I realized I was just being stubborn and
            went back to the full-size keyboard. I'm much happier now.
          </Tool>
          <Tool title="Apple Magic Trackpad">
            Something about all the gestures makes me feel like a wizard with
            special powers. I really like feeling like a wizard with special
            powers.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Visual Studio Code">
            I've tried all the other editors and IDEs but I always come back to
            VS Code. It's just the best.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
            I started using Figma as just a design tool but now it's become our
            virtual whiteboard when working with designers. Never would have
            expected the collaboration features to be the real hook.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
}
