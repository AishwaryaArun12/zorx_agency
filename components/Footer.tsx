import { Wordmark } from "@/components/Wordmark";
import { contact, navLinks } from "@/lib/content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Wordmark color="green" size="md" />
        <div className={styles.cols}>
          <div>
            <p className={styles.label}>Studio</p>
            <p>ZORX</p>
            <p>{contact.city}</p>
          </div>
          <div>
            <p className={styles.label}>Contact</p>
            {contact.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            ))}
            <a href={contact.site} target="_blank" rel="noreferrer">
              {contact.siteLabel}
            </a>
          </div>
          <div>
            <p className={styles.label}>Social</p>
            <a href={contact.site} target="_blank" rel="noreferrer">
              Website
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="#work">Selected work</a>
          </div>
          <div>
            <p className={styles.label}>Index</p>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} ZORX. Fueling Brands Growth.</p>
        <p>Dubai</p>
      </div>
    </footer>
  );
}
