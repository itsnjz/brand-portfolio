"use client";
import { useRef } from "react";
import { MainLogo } from "../MainLogo";
import gsap from "gsap";
import { MenuButton } from "../MenuButton";

type HeaderProps = object;

export default function Header({}: HeaderProps) {
  const logoRef = useRef<HTMLDivElement>(null);

  const onLogoEnter = (): void => {
    if (!logoRef.current) return;

    const currColor: string = logoRef.current.getAttribute("data-color") || "";
    const logoSvg: Element | null = logoRef.current.firstChild
      ?.firstChild as Element;

    const nextColor: string =
      currColor === "#a6e2e3"
        ? "#8566f6"
        : currColor === "#8566f6"
        ? "#ed7c50"
        : "#a6e2e3";

    logoRef.current.setAttribute("data-color", nextColor);
    if (logoSvg) {
      gsap.to(logoSvg, { fill: currColor, duration: 0.2, ease: "power1.out" });
    }
  };

  const onLogoLeave = (): void => {
    if (!logoRef.current) return;

    const logoSvg: Element | null = logoRef.current.firstChild
      ?.firstChild as Element;
    if (logoSvg) {
      gsap.to(logoSvg, {
        fill: "#282829",
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  return (
    <>
      <div className="header  min-w-screen fixed left-0 top-0 z-10 w-screen px-7 transition-all duration-500 ease-out">
        <div className="overflow-hidden bg-none">
          <div className="header_container  flex items-center justify-between transition-all duration-500 ease-out will-change-transform lg:py-8">
            <MenuButton>Menu</MenuButton>
            <div
              className="header_logo  pointer-event-auto cursor-pointer leading-none transition-height [&>svg]:h-10 [&>svg]:duration-500 [&>svg]:ease-out lg:[&>svg]:h-16 "
              data-color="#a6e2e3"
              ref={logoRef}
              onMouseEnter={onLogoEnter}
              onMouseLeave={onLogoLeave}
            >
              <MainLogo />
            </div>
            <MenuButton>Contact</MenuButton>
          </div>
        </div>
      </div>
    </>
  );
}
