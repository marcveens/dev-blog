'use client';
import { useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useSpring, animated } from 'react-spring';
import * as styles from './cloud.css';
import ReactIcon from './icons/react.svg';
import GraphqlIcon from './icons/graphql.svg';

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

const data: Tree = {
  type: 'node',
  name: '',
  value: 2300,
  children: [
    { type: 'leaf', name: 'React', value: 90, icon: ReactIcon, color: '#61dafb' },
    { type: 'leaf', name: 'GraphQL', value: 70, icon: GraphqlIcon, color: '#E535AB' },
    { type: 'leaf', name: 'Emily', value: 34 },
    { type: 'leaf', name: 'Marion', value: 53 },
    { type: 'leaf', name: 'Nicolas', value: 98 },
    { type: 'leaf', name: 'Malki', value: 22 },
    { type: 'leaf', name: 'Djé', value: 20 },
    { type: 'leaf', name: 'Mélanie', value: 45 },
    { type: 'leaf', name: 'Einstein', value: 76 }
  ]
};

const width = 400;
const height = 300;

export const Cloud = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  console.log(hoveredItem);

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
    <svg width={width} height={height} ref={svgRef}>
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
              className={styles.icon}
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
            x={node.x - 100}
            y={node.y - node.r - 23}
            width={200}
            height={20}
            className={styles.tooltipContainer}
          >
            <div className={styles.tooltip[hoveredItem === node.data.name ? 'active' : 'inactive']}>{node.data.name}</div>
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
