"use client";

import {
  useEffect,
  useState,
  createElement,
  useMemo,
  useCallback,
  useRef,
} from "react";

interface TextTypeProps {
  text: string[];
  as?: keyof JSX.IntrinsicElements;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  cursorCharacter?: string;
  variableSpeed?: { min: number; max: number };
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  as: Component = "div",
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  loop = true,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
  variableSpeed,
}) => {
  // ✅ ref type fixed
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = useMemo(() => text, [text]);

  // Lazy load observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  // Typing logic (unchanged)
  useEffect(() => {
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex];

    if (isDeleting) {
      if (currentCharIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCurrentCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) =>
          loop ? (prev + 1) % textArray.length : prev
        );
      }
    } else {
      if (currentCharIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, variableSpeed ? getRandomSpeed() : typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    isInView,
    currentCharIndex,
    isDeleting,
    currentTextIndex,
    textArray,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    getRandomSpeed,
    variableSpeed,
    loop,
  ]);

  return createElement(
    Component,
    {
      ref: containerRef as any, // ✅ SAFE CAST (standard solution)
      className: `
        inline-block
        select-none
        will-change-transform
        text-[18px]
        sm:text-[22px]
        md:text-[26px]
        lg:text-[32px]
        ${className}
      `,
    },
    <>
      <span>{displayedText}</span>
      {showCursor && (
        <span className="ml-1 animate-blink">{cursorCharacter}</span>
      )}
    </>
  );
};

export default TextType;
