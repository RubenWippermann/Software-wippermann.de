"use client";

import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import s from "../portal.module.css";
import { tagesgruss } from "../lib/tagesgruss";

const ausschreibungen=[
  {titel:"Erste-Hilfe-Ausbildung · 9 UE",info:"18.08.2026 · 09:00–16:30",ort:"40210 Düsseldorf",hot:"245 €"},
  {titel:"Erste-Hilfe-Fortbildung · 9 UE",info:"24.08.2026 · 08:30–16:00",ort:"45127 Essen",hot:"235 €"},
  {titel:"Brandschutzhelfer · 4 UE",info:"02.09.2026 · 09:00–12:30",ort:"37073 Göttingen",hot:"190 €"}
];

const bereiche=["Übersicht","Ausschreibungen","Meine Kurse","Kalender","Qualifikationen","Gutschriften","Feedback","Nachrichten"];

export default function Dozenten(){
  const [bereich,setBereich]=useState("Übersicht");
  const [stunde,setStunde]=useState(()=>new Date().getHours());
  const [verfuegbar,setVerfuegbar]=useState(false);
  const [bewerbungen,setBewerbungen]=useState<string[]>([]);
  const toggleBewerbung=(titel:string)=>setBewerbungen(v=>v.includes(titel)?v.filter(x=>x!==titel):[...v,titel]);
  useEffect(()=>{const aktualisieren=()=>setStunde(new Date().getHours());aktualisieren();const timer=window.setInterval(aktualisieren,60_000);return()=>window.clearInterval(timer)},[]);
  const ueberschrift=bereich==="Übersicht"?`${tagesgruss(stunde)}, Lukas`:bereich;

  return <main className={s.page} style={{"--accent":"#f20b7a","--dark":"#9c0750","--soft":"#fff0f7"} as CSSProperties}>
    <header className={s.header}><div className={s.brand}><div><strong>Dozentenportal</strong><small>Personal Paramedic & BWW</small></div></div><nav className={s.nav}><Link href="/kurse">Kurswelt</Link><Link href="/affiliate">Affiliate</Link><Link className={s.primary} href="/">Office</Link></nav></header>
    <div className={s.panel}>
      <aside className={s.panelSide}><div className={s.panelProfile}><div className={s.avatar}>LB</div><div><strong>Lukas Bergmann</strong><small>Lehrkraft · aktiv</small></div></div><div className={s.sideNav}>{bereiche.map(x=><button type="button" key={x} className={bereich===x?s.active:""} onClick={()=>setBereich(x)}>{x}</button>)}</div></aside>
      <section className={s.panelMain}>
        <div className={s.welcome}><div><h1>{ueberschrift}</h1><p>{bereich==="Übersicht"?"Deine Einsätze, Bewerbungen und Qualifikationen.":`${bereich} sind nach Firma, Status und Zeitraum gefiltert.`}</p></div><button type="button" onClick={()=>setVerfuegbar(v=>!v)}>{verfuegbar?"✓ Verfügbarkeit erfasst":"＋ Verfügbarkeit"}</button></div>
        <div className={s.notice}><span>{verfuegbar?"✓":"🚗"}</span><div><strong>{verfuegbar?"Verfügbarkeit gespeichert":"Nächster Einsatz in 3 Tagen"}</strong><p>{verfuegbar?"Deine Disposition wurde informiert. Änderungen bleiben mit Zeitstempel nachvollziehbar.":"Geplante Abfahrt 06:54 Uhr, damit du 30 Minuten früher vor Ort bist. Verkehr und Wetter werden laufend geprüft."}</p></div></div>
        <div className={s.metrics}><article className={s.metric}><small>Nächste Kurse</small><strong>4</strong></article><article className={s.metric}><small>Offene Bewerbungen</small><strong>{bewerbungen.length}</strong></article><article className={s.metric}><small>Offene Gutschriften</small><strong>465 €</strong></article><article className={s.metric}><small>Feedback</small><strong>4,8 ★</strong></article></div>
        <section className={s.list}><div className={s.listHead}><div><h2>Neue Ausschreibungen</h2><small>Nur passend zu deinen Lehrberechtigungen</small></div><small>Kundendaten geschützt</small></div>{ausschreibungen.map(a=>{const aktiv=bewerbungen.includes(a.titel);return <article className={s.row} key={a.titel+a.info}><div><h3>{a.titel}</h3><p>{a.info}</p></div><span>{a.ort}</span><strong>Hotpreis {a.hot}</strong><button type="button" onClick={()=>toggleBewerbung(a.titel)}>{aktiv?"Beworben ✓":"Bewerben"}</button></article>})}</section>
      </section>
    </div>
  </main>
}
