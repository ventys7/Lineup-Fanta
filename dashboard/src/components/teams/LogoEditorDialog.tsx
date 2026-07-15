import { useEffect, useRef, useState } from "react";
import { prepareLogo, uploadTeamLogo, type PreparedLogo } from "../../logoUpload";

export function LogoEditorDialog({ open, leagueId, teamName, currentLogo, onClose, onUpdated }: {
  open: boolean; leagueId: string; teamName: string; currentLogo: string; onClose: () => void; onUpdated: (url: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [code, setCode] = useState("");
  const [prepared, setPrepared] = useState<PreparedLogo | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  async function selectFile(file?: File) {
    if (!file) return;
    setStatus("");
    try { setPrepared(await prepareLogo(file)); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Immagine non valida"); }
  }

  async function save() {
    if (!prepared) { setStatus("Seleziona prima il nuovo stemma."); return; }
    if (!/^\d{6}$/.test(code)) { setStatus("Inserisci il codice stemma di 6 cifre."); return; }
    setBusy(true); setStatus("");
    try {
      const url = await uploadTeamLogo(leagueId, teamName, code, prepared);
      onUpdated(url); setPrepared(null); setCode(""); onClose();
    } catch (error) { setStatus(error instanceof Error ? error.message : "Caricamento non riuscito"); }
    finally { setBusy(false); }
  }

  return (
    <dialog ref={dialog} className="lf-logo-dialog" onClose={onClose} onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className="lf-logo-dialog__head"><div><small>STEMMA FANTASQUADRA</small><h3>{teamName}</h3></div><button type="button" onClick={onClose} aria-label="Chiudi">×</button></div>
      <div className="lf-logo-dialog__preview">
        {(prepared?.previewUrl || currentLogo) ? <img src={prepared?.previewUrl || currentLogo} alt="Anteprima stemma" /> : <span>{teamName.charAt(0).toUpperCase()}</span>}
      </div>
      <label className="lf-logo-file">Scegli immagine<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => selectFile(event.target.files?.[0])} /></label>
      <label className="lf-logo-code">Codice stemma<input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" /></label>
      {status && <p className="lf-logo-dialog__status">{status}</p>}
      <button className="lf-logo-dialog__save" type="button" disabled={busy} onClick={save}>{busy ? "Caricamento…" : "Aggiorna stemma"}</button>
      <p className="lf-logo-dialog__help">Il codice modifica soltanto lo stemma di questa fantasquadra.</p>
    </dialog>
  );
}
