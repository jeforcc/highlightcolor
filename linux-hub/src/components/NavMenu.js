import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import ArticleModal from "./ArticleModal";
import { useNavigate } from "react-router-dom";

// Логотипы и цвета языков программирования
const langIcons = {
  Python: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg", color: "#3776AB" },
  JavaScript: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg", color: "#F7DF1E" },
  "C++": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cplusplus.svg", color: "#00599C" },
  Go: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/go.svg", color: "#00ADD8" },
  Rust: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/rust.svg", color: "#000000" },
  TypeScript: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg", color: "#3178C6" },
  Kotlin: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kotlin.svg", color: "#7F52FF" },
  Swift: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/swift.svg", color: "#FA7343" },
  PHP: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/php.svg", color: "#777BB4" },
  Ruby: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ruby.svg", color: "#CC342D" },
  Scala: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scala.svg", color: "#DC322F" },
  Perl: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/perl.svg", color: "#39457E" },
  // ...добавь остальные по аналогии
};

// Логотипы и цвета дистрибутивов Linux
const distroIcons = {
  Ubuntu: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ubuntu.svg", color: "#E95420" },
  Fedora: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fedora.svg", color: "#51A2DA" },
  Arch: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/archlinux.svg", color: "#1793D1" },
  Debian: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/debian.svg", color: "#A81D33" },
  Mint: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linuxmint.svg", color: "#87CF3E" },
  Manjaro: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/manjaro.svg", color: "#35BF5C" },
  "openSUSE": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opensuse.svg", color: "#73BA25" },
  CentOS: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/centos.svg", color: "#262577" },
  Gentoo: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gentoo.svg", color: "#54487A" },
  Kali: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kalilinux.svg", color: "#557C94" },
  Zorin: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zorin.svg", color: "#0CC1F3" },
  "Pop!_OS": { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/popos.svg", color: "#48B9C7" },
  Alpine: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/alpinelinux.svg", color: "#0D597F" },
  // ...добавь остальные по аналогии
};

// Логотипы и цвета ОС
const osIcons = {
  windows: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/windows.svg", color: "#0078D6" },
  macos: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg", color: "#000000" },
  linux: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linux.svg", color: "#FCC624" },
  // freebsd: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/freebsd.svg", color: "#AB2B28" },
  // android: { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/android.svg", color: "#3DDC84" },
  // ...добавь остальные по аналогии
};

// Реальные языки программирования (дополнительные)
const moreLangs = [
  "Ada", "ALGOL", "APL", "Assembly", "AWK", "Bash", "BASIC", "C#", "Clojure", "COBOL", "Crystal", "D", "Dart", "Delphi",
  "Elixir", "Elm", "Erlang", "F#", "Forth", "Fortran", "Groovy", "Hack", "Haskell", "IDL", "Io", "J", "JavaFX", "Julia",
  "LabVIEW", "Lisp", "Logo", "Lua", "Matlab", "Nim", "Objective-C", "OCaml", "Pascal", "PL/SQL", "Prolog", "PureScript",
  "Q#", "R", "Racket", "Raku", "REXX", "SAS", "Scala.js", "Scheme", "Shell", "Simula", "Smalltalk", "Solidity", "SPARK",
  "SQL", "Standard ML", "Tcl", "Vala", "VB.NET", "Verilog", "VHDL", "Visual Basic", "Wolfram", "XSLT", "Zig",
];

// Реальные дистрибутивы Linux (дополнительные)
const moreDistros = [
  "Alpine", "ALT Linux", "Antergos", "antiX", "AOSC", "ArchBang", "ArchLabs", "Archman", "Artix", "BackBox", "Bodhi",
  "Calculate", "CentOS Stream", "Clear Linux", "Clonezilla", "CRUX", "Deepin", "Devuan", "DragonFly BSD", "elementary OS",
  "EndeavourOS", "EuroLinux", "Feren OS", "Funtoo", "Garuda", "GeckoLinux", "Gentoo", "GoboLinux", "Guix System", "KaOS",
  "KDE neon", "Knoppix", "Kubuntu", "LFS", "Linux Lite", "Linux Mint Debian Edition", "Lubuntu", "Mageia", "MakuluLinux",
  "Mandriva", "MX Linux", "Netrunner", "NixOS", "OpenMandriva", "OpenMediaVault", "OpenWrt", "Parabola", "Parrot OS",
  "Peppermint", "Porteus", "Q4OS", "Qubes OS", "Raspberry Pi OS", "Redcore", "Red Hat Enterprise Linux", "RebornOS",
  "Regata OS", "Rescatux", "Rocky Linux", "Sabayon", "Salix", "Scientific Linux", "Siduction", "Slackel", "Slackware",
  "SliTaz", "Solus", "SparkyLinux", "SteamOS", "Tails", "Trisquel", "Ubuntu Budgie", "Ubuntu Kylin", "Ubuntu MATE",
  "Ubuntu Studio", "Void Linux", "Whonix", "Xubuntu", "Zentyal", "Zorin OS",
];

const articles = {
  PHP: {
    title: "PHP",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
    text: `PHP — популярный язык программирования для веб-разработки, созданный в 1994 году Расмусом Лердорфом. 
    Первоначально PHP расшифровывался как Personal Home Page, но теперь это рекурсивный акроним PHP: Hypertext Preprocessor.
    Язык широко используется для создания динамических веб-сайтов и серверных приложений. 
    На PHP работают такие проекты, как Wikipedia, Facebook (ранние версии), WordPress и многие другие.`,
    img2: "https://www.php.net/images/meta-image.png",
    text2: `PHP поддерживает множество баз данных, имеет огромное сообщество и тысячи библиотек. 
    Современные версии языка поддерживают ООП, типизацию, а также множество фреймворков (Laravel, Symfony, Yii).`
  },
  Ubuntu: {
    title: "Ubuntu",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg",
    text: `Ubuntu — один из самых популярных дистрибутивов Linux, основанный на Debian. 
    Разрабатывается компанией Canonical с 2004 года. 
    Ubuntu известен своей простотой установки, дружелюбным интерфейсом и широкой поддержкой оборудования.
    Используется как на серверах, так и на десктопах.`,
    img2: "https://assets.ubuntu.com/v1/29985a98-ubuntu-logo32.png",
    text2: `Ubuntu выпускается каждые 6 месяцев, а LTS-версии поддерживаются 5 лет. 
    Доступны различные редакции: Desktop, Server, Core, а также официальные варианты с разными окружениями (Kubuntu, Xubuntu, Lubuntu и др.).`
  },
  windows: {
    title: "Windows",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/48/Windows_logo_-_2021.svg",
    text: `Windows — семейство проприетарных операционных систем от Microsoft. 
    Первая версия вышла в 1985 году как графическая надстройка над MS-DOS. 
    Windows стала самой популярной ОС для персональных компьютеров, благодаря удобному интерфейсу, поддержке огромного количества программ и драйверов.`,
    img2: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_11_Logo.svg",
    text2: `Современные версии (Windows 10, 11) поддерживают сенсорные экраны, виртуальные рабочие столы, интеграцию с облаком и многое другое. 
    Windows используется как в домашних, так и в корпоративных и образовательных средах.`
  },
  cplusplus: {
    title: "C++",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    text: `C++ — компилируемый, статически типизированный язык программирования общего назначения, созданный Бьёрном Страуструпом в 1979 году как расширение языка C.
C++ сочетает в себе парадигмы процедурного, объектно-ориентированного и обобщённого программирования. Язык был разработан для повышения производительности и гибкости по сравнению с C, а также для поддержки сложных программных систем.

C++ широко используется для разработки системного и прикладного программного обеспечения, драйверов устройств, операционных систем, высокопроизводительных серверов, игр, графических движков и многого другого. Благодаря своей эффективности и контролю над ресурсами, C++ остаётся одним из самых популярных языков для задач, требующих высокой производительности.`,
    img2: "https://isocpp.org/assets/images/cpp_logo.png",
    text2: `C++ постоянно развивается: современные стандарты (C++11, C++14, C++17, C++20) добавили поддержку лямбда-выражений, умных указателей, многопоточности, новых контейнеров и других современных возможностей.

Особенности C++:
- Высокая производительность и контроль над памятью
- Мощная система типов и шаблонов (templates)
- Поддержка объектно-ориентированного программирования (ООП)
- Совместимость с C и огромная экосистема библиотек

C++ используется такими компаниями, как Microsoft, Google, Adobe, Facebook, а также в проектах с открытым исходным кодом (например, ядро Linux, браузер Chrome, движок Unreal Engine).`
  },
  // ...добавь другие статьи по аналогии!
};

const navData = [
  {
    title: "Мови програмування",
    sectionKey: "language",
    accent: "#2196f3",
    items: [
      { key: "cplusplus", label: "c++" },
      { key: "python", label: "python" },
      { key: "javascript", label: "javascript" },
      { key: "go", label: "go" },
      { key: "rust", label: "rust" },
      { key: "typescript", label: "typescript" }
    ]
  },
  {
    title: "Дистрибутиви Linux",
    sectionKey: "distribution",
    accent: "#43e97b",
    items: [
      { key: "ubuntu", label: "ubuntu" },
      { key: "fedora", label: "fedora" },
      { key: "arch", label: "arch" },
      { key: "debian", label: "debian" },
      { key: "mint", label: "mint" },
      { key: "manjaro", label: "manjaro" }
    ]
  },
  {
    title: "Операційні системи",
    sectionKey: "os",
    accent: "#ff9800",
    items: [
      { key: "windows", label: "windows" },
      { key: "macos", label: "macos" },
      { key: "linux", label: "linux" }
    ]
  }
];

const NavBar = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  background: #232733e6;
  box-shadow: 0 2px 24px #0006;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const NavList = styled.ul`
  display: flex;
  gap: 48px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
  padding: 0;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.accent};
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 18px 18px 18px;
  cursor: pointer;
  transition: color 0.2s;
  outline: none;
  &:hover, &:focus {
    color: #fff;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 62px;
  left: 50%;
  transform: translateX(-50%) translateY(${props => (props.visible ? "0" : "-10px")}) scale(${props => (props.visible ? 1 : 0.98)});
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? "auto" : "none")};
  background: #232733;
  border-radius: 12px;
  box-shadow: 0 8px 32px #0007;
  padding: 18px 32px;
  min-width: 220px;
  max-height: 400px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition:
    opacity 0.35s cubic-bezier(.6,-0.28,.74,.05),
    transform 0.35s cubic-bezier(.6,-0.28,.74,.05);

  scrollbar-width: thin;
  scrollbar-color: #444 #232733;
  &::-webkit-scrollbar {
    width: 8px;
    background: #232733;
  }
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 8px;
  }
`;

const DropdownItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.accent};
  font-size: 1rem;
  padding: 8px 0;
  border-radius: 6px;
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: none;
  transition:
    opacity 0.35s cubic-bezier(.6,-0.28,.74,.05);
  transition-delay: ${props =>
    props.visible
      ? (props.delayIndex < 20 ? 80 + props.delayIndex * 30 : 0)
      : 0
  }ms;
  pointer-events: ${props => (props.visible ? "auto" : "none")};
  cursor: pointer;
  text-align: center;
  &:hover, &:focus {
    background: ${props => props.accent}22;
    color: #fff;
    cursor: pointer;
  }
`;

const MoreButton = styled.button`
  margin: 0;
  background: none;
  color: #bdbdbd;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.2s;
  outline: none;
  display: block;
  text-align: center;
  width: 100%;
  &:hover, &:focus {
    color: #fff;
    background: none;
  }
`;

function getSimpleIconUrl(name) {
  return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[\s!._\-\/]/g, "")}.svg`;
}

function iconExists(url, onSuccess, onError) {
  const img = new window.Image();
  img.onload = onSuccess;
  img.onerror = onError;
  img.src = url;
}

const langKeyMap = {
  "c++": "cplusplus",
  "python": "python",
  // ...
};

export default function NavMenu() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showMore, setShowMore] = useState({});
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  const handleMore = idx => {
    setShowMore(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Функция для получения логотипа и цвета по разделу
  const getIcon = (section, item) => {
    if (section.title === "Мови програмування") return langIcons[item.label];
    if (section.title === "Дистрибутиви Linux") return distroIcons[item.label];
    if (section.title === "Операційні системи") return osIcons[item.label];
    return null;
  };

  return (
    <>
      <NavBar>
        <NavList>
          {navData.map((section, idx) => (
            <NavItem
              key={section.title}
              onMouseEnter={() => setOpenIndex(idx)}
              onMouseLeave={() => setOpenIndex(null)}
              tabIndex={0}
            >
              <NavButton accent={section.accent}>
                <Logo type={section.logoType} accent={section.accent} />
                {section.title}
              </NavButton>
              <Dropdown visible={openIndex === idx}>
                {section.items.map((item, i) => (
                  <DropdownItem
                    key={item.key}
                    accent={section.accent}
                    visible={openIndex === idx}
                    delayIndex={i}
                    onClick={() => navigate(`/${section.sectionKey}/${item.key}`)}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
                {section.more && (
                  <MoreButton onClick={() => handleMore(idx)}>
                    {showMore[idx] ? "Сховати" : "Ще"}
                  </MoreButton>
                )}
              </Dropdown>
            </NavItem>
          ))}
        </NavList>
      </NavBar>
      <ArticleModal
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />
    </>
  );
}