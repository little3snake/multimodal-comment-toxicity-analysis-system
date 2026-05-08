"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Главная" },
  { href: "/image", label: "Проверка изображения" },
  { href: "/text", label: "Проверка текста" },
  { href: "/post", label: "Анализ поста" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-[80px] bg-white-custom flex justify-center">
      <div className="w-[1200px] h-[58px] flex items-center justify-between px-[32px] mt-[11px]">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Toxicity Detector"
            className="w-[60px] h-[60px]"
          />
        </Link>

        <nav className="flex items-center gap-[40px] text-[16px] leading-[24px]">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-primary font-bold"
                    : "text-secondary font-medium hover:text-primary"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}