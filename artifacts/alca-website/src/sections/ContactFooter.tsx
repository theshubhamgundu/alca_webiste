import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import type { SiteData } from "../types/site";
import { waLink } from "../lib/whatsapp";

const LAMP_COLS = ["#FFC85A", "#FF6FA8", "#5FD3C6", "#B28AD6", "#8FD35F"];
const PUP_CORD_PULL_AT = 920;
const PUP_PULL_DURATION = 1700;

export function ContactFooter({ site }: { site: SiteData }) {
  const [, setLocation] = useLocation();
  const [lampI, setLampI] = useState(0);
  const [lampOff, setLampOff] = useState(false);
  const [pull, setPull] = useState(false);

  const lampRef = useRef<HTMLDivElement>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPullingCord, setIsPullingCord] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const [pupState, setPupState] = useState<
    "idle" | "hop" | "look" | "pull"
  >("idle");
  const [pupMsg, setPupMsg] = useState("");
  const pupMsgIndex = useRef(0);
  const pupCordTimer = useRef<number | null>(null);
  const pupNavigationTimer = useRef<number | null>(null);
  const cordPulseTimer = useRef<number | null>(null);
  const pupMessages = [
    "Woof!",
    "Welcome to ALCA!",
    "Snacks?",
    "Arf arf!",
    "Pull the lamp cord!",
  ];

  useEffect(
    () => () => {
      if (pupCordTimer.current !== null) {
        window.clearTimeout(pupCordTimer.current);
      }
      if (pupNavigationTimer.current !== null) {
        window.clearTimeout(pupNavigationTimer.current);
      }
      if (cordPulseTimer.current !== null) {
        window.clearTimeout(cordPulseTimer.current);
      }
    },
    [],
  );

  const cycleLamp = () => {
    if (lampOff) {
      setLampOff(false);
      setLampI(0);
    } else {
      const next = (lampI + 1) % (LAMP_COLS.length + 1);
      if (next === LAMP_COLS.length) {
        setLampOff(true);
        setLampI(-1);
      } else {
        setLampI(next);
      }
    }
  };

  const handleCord = () => {
    setPull(false);
    if (cordPulseTimer.current !== null) {
      window.clearTimeout(cordPulseTimer.current);
    }
    cordPulseTimer.current = window.setTimeout(() => setPull(true), 10);
    cycleLamp();

    setPupState("look");
    setTimeout(() => {
      if (pupState === "look") setPupState("idle");
    }, 1200);
  };

  const handlePupClick = () => {
    if (pupState === "pull" || pupState === "drag-pull") return;

    setPupState("hop");
    setPupMsg(pupMessages[pupMsgIndex.current % pupMessages.length]);
    pupMsgIndex.current++;
    
    setTimeout(() => {
      setPupState((current) => current === "hop" ? "idle" : current);
    }, 1500);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (pupState === "pull" || pupState === "drag-pull") return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - dragPos.x, y: e.clientY - dragPos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;
    setDragPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const moveDist = Math.hypot(dragPos.x, dragPos.y);

    let droppedOnLamp = false;
    if (lampRef.current && e.currentTarget) {
      const pupRect = e.currentTarget.getBoundingClientRect();
      const lampRect = lampRef.current.getBoundingClientRect();
      
      const pupCenterX = pupRect.left + pupRect.width / 2;
      const pupCenterY = pupRect.top + pupRect.height / 2;
      const cordX = lampRect.left + lampRect.width / 2;
      const cordY = lampRect.top + lampRect.height;
      
      const distToCord = Math.hypot(pupCenterX - cordX, pupCenterY - cordY);
      if (distToCord < 150) {
        droppedOnLamp = true;
      }
    }

    if (droppedOnLamp) {
      setPupState("drag-pull" as any);
      setPupMsg("Got it!");
      
      const pupRect = e.currentTarget.getBoundingClientRect();
      const originalPupX = pupRect.left - dragPos.x;
      const originalPupY = pupRect.top - dragPos.y;
      
      // The lamp cord is at left: 66px, top: 88px, height: 40px
      const lampRect = lampRef.current!.getBoundingClientRect();
      const cordX = lampRect.left + 66;
      const cordY = lampRect.top + 128; // 88 + 40
      
      // Dog mouth is roughly top center
      const holdX = cordX - (originalPupX + 65);
      const holdY = cordY - (originalPupY + 15);
      
      // 1. Snap to cord tip
      setDragPos({ x: holdX, y: holdY });
      
      // 2. Wait for snap, then pull down
      setTimeout(() => {
        setPull(false);
        setTimeout(() => {
          setIsPullingCord(true); // switch transition timing to match cord exactly
          cycleLamp();
          setPull(true);
          
          // The cord scales by 1.4 (height: 40px -> 56px = 16px diff)
          setDragPos({ x: holdX, y: holdY + 16 });
          
          // Let go at peak of stretch (250ms)
          setTimeout(() => {
            setIsPullingCord(false);
            setDragPos({ x: 0, y: 0 }); // Fall back to origin
          }, 250);
        }, 20);
      }, 150);

      pupNavigationTimer.current = window.setTimeout(
        () => setLocation("/admin"),
        1500
      );
    } else {
      setDragPos({ x: 0, y: 0 });
      if (moveDist < 10) {
        handlePupClick();
      }
    }
  };

  return (
    <>
      <section className="contact rv" id="contact">
        {/* Lamp component */}
        <div
          ref={lampRef}
          className={`lamp ${lampOff ? "off" : ""}`}
          style={
            { "--lc": LAMP_COLS[Math.max(0, lampI)] } as React.CSSProperties
          }
        >
          <div className="wire"></div>
          <div className="shade"></div>
          <div className="bulb"></div>
          <div className="cone"></div>
          {[-60, -20, 30, 70].map((dx, i) => (
            <i
              key={i}
              className="dust"
              style={
                {
                  "--dx": `${dx}px`,
                  animationDelay: `${-i * 1.5}s`,
                } as React.CSSProperties
              }
            ></i>
          ))}
          <button
            type="button"
            className={`cord ${pull ? "pull" : ""}`}
            aria-label="Pull the lamp cord to change the light colour"
            onClick={handleCord}
          ></button>
        </div>

        <div
          className={`card ${lampOff ? "lamp-off" : ""}`}
          style={{ position: "relative" }}
        >
          <div className="eyebrow">Visit</div>
          <h3 id="c-place">{site.contact.place}</h3>
          <address id="c-addr" style={{ whiteSpace: "pre-line" }}>
            {site.contact.address}
          </address>
          <a
            className="btn ghost"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.map || site.contact.address)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps <span className="arrow">→</span>
          </a>
        </div>
        <div className="card pupcard">
          <div className="eyebrow">Talk to us</div>
          <h3>Call, WhatsApp or DM</h3>
          <p>
            Tell us what you need, whether it's one service or the whole event.
          </p>
          <div className="handle">
            <span className="eyebrow">Orders: food & gifts</span>
            <code id="c-oph">{site.contact.ordersPhone}</code>
            <button
              type="button"
              className="copy"
              onClick={() =>
                navigator.clipboard.writeText(site.contact.ordersPhone)
              }
            >
              Copy
            </button>
          </div>
          <div className="handle">
            <span className="eyebrow">ALCA</span>
            <code id="c-mph">{site.contact.mainPhone}</code>
            <button
              type="button"
              className="copy"
              onClick={() =>
                navigator.clipboard.writeText(site.contact.mainPhone)
              }
            >
              Copy
            </button>
          </div>

          <div className="bigsoc" id="c-soc">
            {site.contact.ig1 && (
              <a
                className="sbtn ig"
                href={`https://www.instagram.com/${site.contact.ig1}/`}
                target="_blank"
                rel="noopener"
              >
                <i>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" />
                  </svg>
                </i>
                <span>
                  <small>Instagram</small>@{site.contact.ig1}
                </span>
              </a>
            )}
            {site.contact.ig2 && (
              <a
                className="sbtn ig"
                href={`https://www.instagram.com/${site.contact.ig2}/`}
                target="_blank"
                rel="noopener"
              >
                <i>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" />
                  </svg>
                </i>
                <span>
                  <small>Instagram</small>@{site.contact.ig2}
                </span>
              </a>
            )}
            
            <a
              className="sbtn fb"
              href={`https://www.facebook.com/search/top?q=${encodeURIComponent("ALCA Hyderabad")}`}
              target="_blank"
              rel="noopener"
            >
              <i>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M13.6 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5H17V3.1c-.3-.1-1.2-.1-2.3-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H8v3.2h2.5V21z"
                  />
                </svg>
              </i>
              <span>
                <small>Facebook</small>ALCA Hyderabad
              </span>
            </a>
          </div>

          {/* Puppy Component */}
          <button
            type="button"
            className={`pup ${pupState === "hop" || pupState === "drag-pull" ? "hop say" : pupState === "look" ? "look" : pupState === "pull" ? "pulling" : ""}`}
            aria-label={
              pupState === "pull" || pupState === "drag-pull"
                ? "Puppy is pulling the lamp cord"
                : "Drag the puppy to the lamp, or click to say hi"
            }
            aria-busy={pupState === "pull" || pupState === "drag-pull"}
            disabled={pupState === "pull" || pupState === "drag-pull"}
            style={{
              transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
              transition: isDragging 
                ? "none" 
                : isPullingCord 
                  ? "transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1)" 
                  : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              touchAction: "none",
              zIndex: isDragging ? 50 : undefined
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <svg viewBox="0 0 124 116" aria-hidden="true">
              <ellipse className="shadow" cx="62" cy="110" rx="42" ry="5" />
              <g className="tail">
                <path
                  d="M92 92c10-4 16-14 14-26"
                  fill="none"
                  stroke="#C98A4B"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M106 66c1-3 0-5-2-6"
                  fill="none"
                  stroke="#FFF4E6"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </g>
              <path d="M36 108c-6-18 0-40 26-40s32 22 26 40z" fill="#C98A4B" />
              <path
                d="M50 108c-2-14 2-26 12-28 10 2 14 14 12 28z"
                fill="#FFF4E6"
              />
              <ellipse
                cx="46"
                cy="106"
                rx="9"
                ry="5"
                fill="#FFF4E6"
                stroke="#8B5A2B"
                strokeWidth="1.5"
              />
              <ellipse
                cx="78"
                cy="106"
                rx="9"
                ry="5"
                fill="#FFF4E6"
                stroke="#8B5A2B"
                strokeWidth="1.5"
              />
              <path
                d="M52 76l10 6 10-6"
                fill="none"
                stroke="#D62839"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle
                cx="62"
                cy="84"
                r="3.5"
                fill="#F2B544"
                stroke="#8B5A2B"
                strokeWidth="1"
              />
              <g className="head">
                <g className="earL">
                  <path
                    d="M44 30c-14 0-20 18-14 32 4 6 10 4 12-2z"
                    fill="#8B5A2B"
                  />
                </g>
                <g className="earR">
                  <path
                    d="M80 30c14 0 20 18 14 32-4 6-10 4-12-2z"
                    fill="#8B5A2B"
                  />
                </g>
                <ellipse cx="62" cy="44" rx="24" ry="22" fill="#C98A4B" />
                <path d="M62 24c-4 8-4 16 0 22 4-6 4-14 0-22z" fill="#FFF4E6" />
                <ellipse cx="62" cy="56" rx="14" ry="10" fill="#FFF4E6" />
                <ellipse
                  cx="52"
                  cy="40"
                  rx="3.6"
                  ry="4.2"
                  className="eye"
                  fill="#2A1A14"
                />
                <ellipse
                  cx="72"
                  cy="40"
                  rx="3.6"
                  ry="4.2"
                  className="eye"
                  fill="#2A1A14"
                />
                <circle cx="53.4" cy="38.4" r="1.2" fill="#fff" />
                <circle cx="73.4" cy="38.4" r="1.2" fill="#fff" />
                <ellipse
                  cx="46"
                  cy="50"
                  rx="4"
                  ry="2.4"
                  fill="#F28C9B"
                  opacity=".6"
                />
                <ellipse
                  cx="78"
                  cy="50"
                  rx="4"
                  ry="2.4"
                  fill="#F28C9B"
                  opacity=".6"
                />
                <ellipse
                  className="nose"
                  cx="62"
                  cy="51"
                  rx="5"
                  ry="3.6"
                  fill="#2A1A14"
                />
                <path
                  d="M62 55v4M56 59c3 3 9 3 12 0"
                  fill="none"
                  stroke="#2A1A14"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  className="tongue"
                  d="M59 61h6v5a3 3 0 0 1-6 0z"
                  fill="#EE6F86"
                />
              </g>
            </svg>
            <span className="woof">{pupMsg}</span>
            <span className="zz">z z</span>
          </button>
        </div>
      </section>

      <footer>
        <span>
          <b className="wmf">ALCA</b> · Hyderabad ©{" "}
          {new Date().getFullYear()}
        </span>
        <div id="f-foot">{site.footer}</div>
      </footer>

      <a
        className="fab"
        href={waLink(site.contact.ordersPhone, "Hi ALCA")}
        target="_blank"
        rel="noopener"
        aria-label="Order on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .1 5.392.1 11.952c0 2.098.546 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.392 11.893-11.95a11.812 11.812 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
