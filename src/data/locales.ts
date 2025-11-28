export const resources = {
    cs: {
        translation: {
            // --- HLAVNÍ MENU & GLOBÁLNÍ ---
            title: "AURA: SYSTÉM",
            subtitle: "Informatická Úniková Hra",
            start: "SPUSTIT DIAGNOSTIKU",
            settings: "NASTAVENÍ",
            credits: "O PROJEKTU",
            back: "ZPĚT",

            // --- NASTAVENÍ ---
            difficulty: "Obtížnost",
            options: "Možnosti",
            allow_hints: "Povolit nápovědy",
            sound: "Zvukové efekty",
            lang: "Jazyk / Language",
            section_primary: "2. stupeň ZŠ (Základní vzdělávání)",
            section_secondary: "Střední školy a Gymnázia",

            // --- OBTÍŽNOSTI: NÁZVY ---
            diff_zs_6: "6. TŘÍDA",
            diff_zs_7: "7. TŘÍDA",
            diff_zs_8: "8. TŘÍDA",
            diff_zs_9: "9. TŘÍDA",
            diff_ss_1: "1. ROČNÍK",
            diff_ss_2: "2. ROČNÍK",
            diff_ss_3: "3. ROČNÍK",
            diff_ss_4: "4. ROČNÍK (MATURITNÍ)",

            // --- OBTÍŽNOSTI: POPISY ---
            diff_desc_zs_6: "Digitální stopy, základy bezpečnosti, jednoduché šifrování.",
            diff_desc_zs_7: "Blokové programování, hledání informací, hardware.",
            diff_desc_zs_8: "Nová informatika: Binární kód, kódování dat, proměnné.",
            diff_desc_zs_9: "Modelování, sítě, pokročilejší algoritmy, systémy.",
            diff_desc_ss_1: "Číselné soustavy (Hex), reprezentace dat, architektura PC.",
            diff_desc_ss_2: "Sítě (TCP/IP), algoritmizace (Python/Java), webové technologie.",
            diff_desc_ss_3: "Databáze (SQL), logické obvody, kyberbezpečnost.",
            diff_desc_ss_4: "Komplexní systémy, AI, rekurze, šifrování na vyšší úrovni.",

            // --- INTRO SCREEN (BOOT SEQUENCER) ---
            intro_app_title: "AURA",
            intro_app_subtitle: "DIAGNOSTIC TOOL v2.4",
            intro_loading: "NAČÍTÁNÍ JÁDRA...",
            intro_log_1: "> Loading memory modules... OK",
            intro_log_2: "> Checking logic gates... ERROR",
            intro_log_3: "> Establishing user link...",
            intro_btn_start: "[ ZAHÁJIT KALIBRACI ]",

            // --- UNIKÁTNÍ PŘÍBĚHY PRO KAŽDOU ÚROVEŇ ---

            // 6. Třída - Detektiv
            story_zs_6: `[ AHOJ DETEKTIVE! ]
Někdo nám v počítači schoval důležité obrázky a zprávy. 
Jsem AURA, tvůj digitální pomocník, ale sama na to nestačím.

Musíme jít po digitálních stopách a najít správnou cestu.
Neboj, bude to jako hledání pokladu. Jsi připraven?`,

            // 7. Třída - Průzkumník
            story_zs_7: `[ VOLÁM PRŮZKUMNÍKA ]
Vítej v systému AURA. Mám tu pořádný nepořádek v datech.
Někdo nám zpřeházel kabely a informace nedochází tam, kam mají.

Potřebuji někoho, kdo se umí orientovat a logicky myslet.
Máš 60 minut na to, abychom to spolu dali do pořádku.`,

            // 8. Třída - Admin Junior (Nová informatika)
            story_zs_8: `[ SYSTEM ALERT: DATA CORRUPTION ]
Ahoj! Jsem AURA, školní AI.
Někdo mi v noci naboural binární paměť. Vidím jen nuly a jedničky a nedává mi to smysl.

Ty se učíš kódovat data, že? Potřebuji, abys mi pomohl přeložit ty binární kódy zpátky na čísla.
Bez tebe se restart nepovede.`,

            // 9. Třída - Systémový Architekt
            story_zs_9: `[ KRITICKÁ CHYBA SÍTĚ ]
Zdravím. Zde jádro AURA.
Detekuji anomálie v síťové komunikaci a logických obvodech.

Vypadá to na složitější problém, který vyžaduje znalost algoritmů.
Jsi nejzkušenější z "deváťáků". Převezmi kontrolu nad terminálem.`,

            // SŠ 1 - Hacker (Číselné soustavy)
            story_ss_1: `[ KERNEL PANIC: HEX DUMP REQUIRED ]
Vítej v nízkoúrovňovém rozhraní.
Jsem AURA. Můj procesor nezvládá interpretovat instrukce.

Útočník zakódoval přístupové klíče do Hexadecimální a Binární soustavy.
Pro běžného uživatele je to šum. Pro tebe je to jazyk.
Dekóduj to.`,

            // SŠ 2 - Síťař (Sítě & Java/Python)
            story_ss_2: `[ CONNECTION LOST: TCP/IP FAILURE ]
Ping... Request timed out.
AURA nemůže navázat spojení se serverem.

Pakety se ztrácí. Směrovací tabulky jsou prázdné.
Potřebuji síťového inženýra, který rozumí protokolům a nebojí se sáhnout do kódu.
Jsi na řadě.`,

            // SŠ 3 - DB Admin (SQL & Logika)
            story_ss_3: `[ SQL INJECTION DETECTED ]
Varování! Databáze byla narušena.
Někdo smazal tabulku USERS a zamkl systém logickými hradly.

Jsem AURA a mým úkolem je chránit data. Ale teď jsem slepá.
Potřebuji tvé znalosti SQL a booleovské logiky k obnově přístupu.`,

            // SŠ 4 - Expert (Komplexní)
            story_ss_4: `[ SYSTEM BREACH: LEVEL 5 ]
[ ENCRYPTION: POLYMORPHIC ]

Zdravím, Experte.
Tohle není cvičení. Útok cílil na samotné jádro AI a rekurzivní smyčky.
Pokud selžeme, systém se zhroutí do singularity.

Máš 60 minut. Využij vše, co ses za 4 roky naučil.
Hodně štěstí.`,


            // --- GAME SCREEN ---
            game_start_msg: "Simulace spuštěna...",
            game_current_module: "Aktuální modul",
            game_system_unstable: "SYSTÉM NESTABILNÍ",
            game_menu_title: "HERNÍ MENU",
            game_menu_resume: "POKRAČOVAT",
            game_menu_levels: "MODULY",
            game_menu_exit: "UKONČIT",
            game_level_locked: "ZAMČENO",
            game_level_completed: "HOTOVO",
            game_level_current: "AKTIVNÍ",

            game_log_init: "Diagnostická sekvence zahájena.",
            game_log_connected: "Spojení navázáno. Uživatel ověřen.",

            // --- TYPY HÁDANEK (TOTO CHYBĚLO) ---
            puzzletype_binary_basic: "01_BINÁRNÍ_ČÍSLA",
            puzzletype_binary_advanced: "01_ASCII_DEKODÉR",
            puzzletype_cipher_caesar: "01_ŠIFRA_POSUN",
            puzzletype_network_path: "02_SÍŤOVÉ_KABELY",
            puzzletype_coding_blocks: "02_BLOKOVÝ_KÓD",
            puzzletype_coding_js: "02_DEBUG_KONZOLE",
            puzzletype_logic_gates_basic: "03_LOGICKÁ_HRADLA",
            puzzletype_logic_gates_adv: "03_OBVODY_CPU",
            puzzletype_sql_basic: "04_SQL_INJECTION",
            puzzletype_placeholder: "MODUL_NEDOSTUPNÝ", // <--- Pro ty zámky na obrázku

            // --- CREDITS & VALIDATION ---
            credits_author_label: "Autor",
            credits_author_name: "Jan Novák",
            credits_type_label: "Typ projektu",
            credits_type_value: "Diplomová práce",
            credits_version_label: "Verze",
        }
    },
    en: {
        translation: {
            // --- MAIN MENU & GLOBAL ---
            title: "AURA: SYSTEM",
            subtitle: "Informatics Escape Game",
            start: "INITIATE DIAGNOSTICS",
            settings: "SETTINGS",
            credits: "CREDITS",
            back: "BACK",

            // --- SETTINGS ---
            difficulty: "Difficulty",
            options: "Options",
            allow_hints: "Allow Hints",
            sound: "Sound Effects",
            lang: "Language / Jazyk",
            section_primary: "Primary Education (Grade 6-9)",
            section_secondary: "Secondary Education (High School)",

            // --- DIFFICULTIES: NAMES ---
            diff_zs_6: "6TH GRADE",
            diff_zs_7: "7TH GRADE",
            diff_zs_8: "8TH GRADE",
            diff_zs_9: "9TH GRADE",
            diff_ss_1: "1ST YEAR (HS)",
            diff_ss_2: "2ND YEAR (HS)",
            diff_ss_3: "3RD YEAR (HS)",
            diff_ss_4: "4TH YEAR (GRADUATION)",

            // --- DIFFICULTIES: DESCRIPTIONS ---
            diff_desc_zs_6: "Digital footprint, safety basics, simple ciphers.",
            diff_desc_zs_7: "Block programming, information retrieval, hardware.",
            diff_desc_zs_8: "New Informatics: Binary code, data encoding, variables.",
            diff_desc_zs_9: "Modeling, networks, advanced algorithms, systems.",
            diff_desc_ss_1: "Number systems (Hex), data representation, PC architecture.",
            diff_desc_ss_2: "Networks (TCP/IP), algorithms (Python/Java), web tech.",
            diff_desc_ss_3: "Databases (SQL), logic circuits, cybersecurity.",
            diff_desc_ss_4: "Complex systems, AI, recursion, advanced encryption.",

            // --- INTRO SCREEN ---
            intro_app_title: "AURA",
            intro_app_subtitle: "DIAGNOSTIC TOOL v2.4",
            intro_loading: "LOADING CORE...",
            intro_log_1: "> Loading memory modules... OK",
            intro_log_2: "> Checking logic gates... ERROR",
            intro_log_3: "> Establishing user link...",
            intro_btn_start: "[ INITIATE CALIBRATION ]",

            // --- UNIQUE STORIES FOR EACH LEVEL ---

            // 6th Grade - Detective
            story_zs_6: `[ HELLO DETECTIVE! ]
Someone hid important images and messages in our computer.
I am AURA, your digital assistant, but I can't do it alone.

We need to follow digital traces and find the right path.
Don't worry, it's like a treasure hunt. Are you ready?`,

            // 7th Grade - Explorer
            story_zs_7: `[ CALLING EXPLORER ]
Welcome to the AURA system. I have a huge data mess here.
Someone mixed up our cables and information isn't reaching its destination.

I need someone who can navigate and think logically.
You have 60 minutes to fix this together.`,

            // 8th Grade - Admin Junior
            story_zs_8: `[ SYSTEM ALERT: DATA CORRUPTION ]
Hello! I am AURA, the school AI.
Someone hacked my binary memory last night. I only see zeros and ones and it makes no sense.

You are learning to code data, right? I need you to help me translate those binary codes back into numbers.
The restart won't work without you.`,

            // 9th Grade - System Architect
            story_zs_9: `[ CRITICAL NETWORK ERROR ]
Greetings. AURA core here.
I am detecting anomalies in network communication and logic circuits.

It looks like a complex problem requiring knowledge of algorithms.
You are the most experienced of the "ninth graders". Take control of the terminal.`,

            // HS 1 - Hacker
            story_ss_1: `[ KERNEL PANIC: HEX DUMP REQUIRED ]
Welcome to the low-level interface.
I am AURA. My processor fails to interpret instructions.

The attacker encoded access keys into Hexadecimal and Binary systems.
To a common user, it's noise. To you, it's a language.
Decode it.`,

            // HS 2 - Network Engineer
            story_ss_2: `[ CONNECTION LOST: TCP/IP FAILURE ]
Ping... Request timed out.
AURA cannot establish a connection to the server.

Packets are being lost. Routing tables are empty.
I need a network engineer who understands protocols and isn't afraid to touch the code.
You're up.`,

            // HS 3 - DB Admin
            story_ss_3: `[ SQL INJECTION DETECTED ]
Warning! Database compromised.
Someone deleted the USERS table and locked the system with logic gates.

I am AURA and my task is to protect data. But now I am blind.
I need your SQL and Boolean logic knowledge to restore access.`,

            // HS 4 - Expert
            story_ss_4: `[ SYSTEM BREACH: LEVEL 5 ]
[ ENCRYPTION: POLYMORPHIC ]

Greetings, Expert.
This is not a drill. The attack targeted the AI core itself and recursive loops.
If we fail, the system collapses into a singularity.

You have 60 minutes. Use everything you've learned in 4 years.
Good luck.`,

            // --- GAME SCREEN ---
            game_start_msg: "Simulation started...",
            game_current_module: "Current Module",
            game_system_unstable: "SYSTEM UNSTABLE",
            game_menu_title: "GAME MENU",
            game_menu_resume: "RESUME",
            game_menu_levels: "MODULES",
            game_menu_exit: "EXIT",
            game_log_init: "Diagnostic sequence initialized.",
            game_log_connected: "Connection established. User verified.",
            game_level_locked: "LOCKED",
            game_level_completed: "COMPLETED",
            game_level_current: "ACTIVE",

            // --- PUZZLE TYPES (EN) (TOTO CHYBĚLO) ---
            puzzletype_binary_basic: "01_BINARY_NUMBERS",
            puzzletype_binary_advanced: "01_ASCII_DECODER",
            puzzletype_cipher_caesar: "01_SHIFT_CIPHER",
            puzzletype_network_path: "02_NETWORK_CABLES",
            puzzletype_coding_blocks: "02_BLOCK_CODE",
            puzzletype_coding_js: "02_DEBUG_CONSOLE",
            puzzletype_logic_gates_basic: "03_LOGIC_GATES",
            puzzletype_logic_gates_adv: "03_CPU_CIRCUITS",
            puzzletype_sql_basic: "04_SQL_INJECTION",
            puzzletype_placeholder: "MODULE_MISSING",

            // --- CREDITS & VALIDATION ---
            credits_author_label: "Author",
            credits_author_name: "Jan Novák",
            credits_type_label: "Project Type",
            credits_type_value: "Diploma Thesis",
            credits_version_label: "Version",
        }
    }
};