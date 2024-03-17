'use client';
import { useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useSpring, animated } from 'react-spring';
import ReactIcon from './icons/react.svg';
import GraphqlIcon from './icons/graphql.svg';
import TypescriptIcon from './icons/typescript.svg';
import ViteIcon from './icons/vite.svg';
import ApolloIcon from './icons/apollo.svg';
import ReduxIcon from './icons/redux.svg';
import NodejsIcon from './icons/nodejs.svg';
import VercelIcon from './icons/vercel.svg';
import GitIcon from './icons/git.svg';
import SupabaseIcon from './icons/supabase.svg';
import NextjsIcon from './icons/nextjs.svg';
import MuiIcon from './icons/mui.svg';
import RollupIcon from './icons/rollup.svg';
import NpmIcon from './icons/npm.svg';
import AzureIcon from './icons/azure.svg';
import GithubActionsIcon from './icons/github-actions.svg';
import TanstackIcon from './icons/tanstack.svg';
import RjsfIcon from './icons/rjsf.svg';
import StorybookIcon from './icons/storybook.svg';
import NxIcon from './icons/nx.svg';
import { twClass } from '@/utils/twClass';

export type TreeNode = {
  type: 'node';
  value: number;
  name: string;
  icon?: string;
  color?: string;
  children: Tree[];
};
export type TreeLeaf = {
  type: 'leaf';
  name: string;
  icon?: string;
  color?: string;
  value: number;
};

export type Tree = TreeNode | TreeLeaf;

type CloudProps = {
  width: number;
  height: number;
};

const data: Tree = {
  type: 'node',
  name: '',
  value: 2300,
  children: [
    { type: 'leaf', name: 'React', value: 90, icon: ReactIcon, color: '#61dafb' },
    { type: 'leaf', name: 'GraphQL', value: 70, icon: GraphqlIcon, color: '#E535AB' },
    { type: 'leaf', name: 'TypeScript', value: 90, icon: TypescriptIcon, color: '#3178c6' },
    { type: 'leaf', name: 'Vite', value: 53, icon: ViteIcon, color: '#636CFF' },
    { type: 'leaf', name: 'Apollo GraphQL', value: 30, icon: ApolloIcon, color: '#FC5201' },
    { type: 'leaf', name: 'Redux', value: 22, icon: ReduxIcon, color: '#764ABC' },
    { type: 'leaf', name: 'Node.js', value: 70, icon: NodejsIcon, color: '#8CC84B' },
    { type: 'leaf', name: 'Vercel', value: 45, icon: VercelIcon, color: '#000' },
    { type: 'leaf', name: 'Git', value: 15, icon: GitIcon, color: '#F05133' },
    { type: 'leaf', name: 'Supabase', value: 32, icon: SupabaseIcon, color: '#3DCF8E' },
    { type: 'leaf', name: 'Next.js', value: 40, icon: NextjsIcon, color: '#000' },
    { type: 'leaf', name: 'MUI', value: 25, icon: MuiIcon, color: '#0177ED' },
    { type: 'leaf', name: 'Rollup', value: 15, icon: RollupIcon, color: '#FF2F2F' },
    { type: 'leaf', name: 'npm', value: 15, icon: NpmIcon, color: '#CC3533' },
    { type: 'leaf', name: 'Azure', value: 30, icon: AzureIcon, color: '#0089D6' },
    { type: 'leaf', name: 'Github Actions', value: 25, icon: GithubActionsIcon, color: '#2088ff' },
    { type: 'leaf', name: 'TanStack Query', value: 40, icon: TanstackIcon, color: '#EF4543' },
    { type: 'leaf', name: 'RJSF', value: 25, icon: RjsfIcon, color: '#000' },
    { type: 'leaf', name: 'Storybook', value: 40, icon: StorybookIcon, color: '#FF4785' },
    { type: 'leaf', name: 'Nx', value: 50, icon: NxIcon, color: '#012F55' }
  ]
};

const tooltipClass = twClass('absolute top-0 left-2/4 -translate-x-2/4 rounded bg-tooltip text-contrast text-xs leading-none py-1 px-2 transition-opacity', {
  variants: {
    active: { true: 'opacity-100', false: 'opacity-0' }
  }
});

export const Cloud = (props: CloudProps) => {
  const { width, height } = props;
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Process the data to have a hierarchy structure;
  const hierarchy = useMemo(() => {
    return d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value! - a.value!);
  }, [data]);

  const root = useMemo(() => {
    // @ts-ignore
    return d3.pack<Tree>().size([width, height]).padding(10)(hierarchy);
  }, [hierarchy, width, height]);

  return (
    <svg ref={svgRef} className="w-full aspect-[100/115] relative">
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <AnimatedCircle
            key={node.data.name}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.data.color}
            // opacity={.9}
            onMouseEnter={() => {
              setHoveredItem(node.data.name);
            }}
            onMouseLeave={() => {
              setHoveredItem(null);
            }}
          />
        ))}
      {root
        .descendants()
        .slice(1)
        .map((node) => {
          const Icon = node.data.icon;

          return (
            <AnimatedObject
              key={node.data.name}
              x={node.x}
              y={node.y}
              width={node.r}
              height={node.r}
              alignmentBaseline="middle"
              className="pointer-events-none [&_svg]:block"
            >
              {Icon && <Icon />}
            </AnimatedObject>
          );
        })}
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <foreignObject
            key={node.data.name}
            x={node.x - 125}
            y={node.y - node.r - 23}
            width={250}
            height={20}
            className="pointer-events-none relative"
          >
            <div className={tooltipClass({ active: hoveredItem === node.data.name })}>{node.data.name}</div>
          </foreignObject>
        ))}
    </svg>
  );
};

const AnimatedCircle = ({ cx, cy, r, ...props }: React.SVGAttributes<SVGCircleElement>) => {
  const animatedProps = useSpring({
    cx,
    cy,
    r
  });
  return <animated.circle {...props} r={animatedProps.r as any} cx={animatedProps.cx as any} cy={animatedProps.cy as any} />;
};

const AnimatedObject = ({ x, y, ...props }: React.SVGAttributes<SVGForeignObjectElement>) => {
  const centerX = (x as number) - (props.width as number) / 2;
  const centerY = (y as number) - (props.height as number) / 2;

  const animatedProps = useSpring({
    x: centerX,
    y: centerY
  });

  return <animated.foreignObject {...props} x={animatedProps.x as any} y={animatedProps.y as any} />;
};
