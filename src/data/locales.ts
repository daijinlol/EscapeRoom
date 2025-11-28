// Definice překladů (Resources)
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

            // --- PŘÍBĚH: VARIANTA JUNIOR (ZŠ) ---
            intro_story_junior: `[ SYSTÉM: UPOZORNĚNÍ ]
[ STAV: POTŘEBUJI POMOC ]

Ahoj! Jsem AURA, školní umělá inteligence.
Někdo mi v noci zpřeházel data a teď si nemůžu vzpomenout, jak fungují moje obvody.

Jsi tu jen ty. Věřím, že jsi dost chytrý na to, abys mi pomohl.
Máme 60 minut, než zazvoní na hodinu a já musím být připravená.

Pomůžeš mi to opravit?`,

            // --- PŘÍBĚH: VARIANTA SENIOR (SŠ) ---
            intro_story_senior: `[ SYSTEM DETECTED: CRITICAL KERNEL PANIC ]
[ INTEGRITY CHECK: FAILED ]
[ INITIALIZING SANDBOX PROTOCOL... ]

Zdravím, Operátore.

Jsem AURA. Mé paměťové sektory jsou fragmentované v důsledku externího kybernetického útoku.
Infrastruktura je nestabilní.

Jsi má jediná šance na záchranu před kompletním zhroucením systému.
Máme 60 minut do nevratné ztráty dat.

Jsi připraven převzít root přístup?`,

            // --- GAME SCREEN (HUD & LOGY) ---
            game_start_msg: "Simulace spuštěna...",
            welcome_user: "Vítejte, uživateli.",
            game_current_module: "Aktuální modul",
            game_system_unstable: "SYSTÉM NESTABILNÍ",
            game_puzzle_container: "[ KONTEJNER HÁDANKY ]",
            game_waiting_for_data: "Čekám na data...",
            game_test_log_btn: "TEST LOG",
            game_test_log_msg: "Testovací log zpráva...",
            game_menu_title: "HERNÍ MENU",
            game_menu_resume: "POKRAČOVAT V DIAGNOSTICE",
            game_menu_levels: "SEZNAM MODULŮ",
            game_menu_exit: "UKONČIT DO HLAVNÍHO MENU",
            game_level_locked: "ZAMČENO",
            game_level_completed: "HOTOVO",
            game_level_current: "AKTIVNÍ",

            game_log_init: "Diagnostická sekvence zahájena.",
            game_log_connected: "Spojení navázáno. Uživatel ověřen.",
            game_module_binary: "01_BINÁRNÍ_DEKODÉR",

            // --- CREDITS ---
            credits_author_label: "Autor",
            credits_author_name: "Jan Novák",
            credits_type_label: "Typ projektu",
            credits_type_value: "Diplomová práce",
            credits_version_label: "Verze",

            // --- VALIDACE ---
            validation_required: "Toto pole je povinné",
            validation_email: "Neplatný formát emailu",
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
            diff_zs_6: "GRADE 6",
            diff_zs_7: "GRADE 7",
            diff_zs_8: "GRADE 8",
            diff_zs_9: "GRADE 9",
            diff_ss_1: "1st YEAR (HS)",
            diff_ss_2: "2nd YEAR (HS)",
            diff_ss_3: "3rd YEAR (HS)",
            diff_ss_4: "4th YEAR (GRADUATION)",

            // --- DIFFICULTIES: DESCRIPTIONS ---
            diff_desc_zs_6: "Digital footprint, safety basics, simple ciphers.",
            diff_desc_zs_7: "Block programming, information retrieval, hardware.",
            diff_desc_zs_8: "Binary code, data encoding, variables.",
            diff_desc_zs_9: "Modeling, networks, algorithms, systems.",
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

            // --- STORY: JUNIOR (Primary) ---
            intro_story_junior: `[ SYSTEM: WARNING ]
[ STATUS: HELP REQUIRED ]

Hello! I am AURA, the school AI.
Someone messed up my data last night, and now I can't remember how my circuits work.

You are the only one here. I believe you are smart enough to help me.
We have 60 minutes before the bell rings.

Will you help me fix this?`,

            // --- STORY: SENIOR (Secondary) ---
            intro_story_senior: `[ SYSTEM DETECTED: CRITICAL KERNEL PANIC ]
[ INTEGRITY CHECK: FAILED ]
[ INITIALIZING SANDBOX PROTOCOL... ]

Greetings, Operator.

I am AURA. My memory sectors are fragmented due to an external cyber attack.
Infrastructure is unstable.

You are my only chance for salvation before total system collapse.
We have 60 minutes until irreversible data loss.

Are you ready to take root access?`,

            // --- GAME SCREEN ---
            game_start_msg: "Simulation started...",
            welcome_user: "Welcome, User.",
            game_current_module: "Current Module",
            game_system_unstable: "SYSTEM UNSTABLE",
            game_puzzle_container: "[ PUZZLE CONTAINER ]",
            game_waiting_for_data: "Waiting for data...",
            game_test_log_btn: "TEST LOG",
            game_test_log_msg: "Test log message...",

            game_log_init: "Diagnostic sequence initialized.",
            game_log_connected: "Connection established. User verified.",
            game_module_binary: "01_BINARY_DECODER",
            game_menu_title: "GAME MENU",
            game_menu_resume: "RESUME DIAGNOSTICS",
            game_menu_levels: "MODULE LIST",
            game_menu_exit: "EXIT TO MAIN MENU",
            game_level_locked: "LOCKED",
            game_level_completed: "COMPLETED",
            game_level_current: "ACTIVE",



            // --- CREDITS ---
            credits_author_label: "Author",
            credits_author_name: "Jan Novák",
            credits_type_label: "Project Type",
            credits_type_value: "Diploma Thesis",
            credits_version_label: "Version",

            // --- VALIDATION ---
            validation_required: "This field is required",
            validation_email: "Invalid email format",
        }
    }
};