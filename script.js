<script>
// ─── STATE ───────────────────────────────────────────
let currentLang = 'en';
let selectedAnimalName = '';
let isRecording = false;
let recognitionActive = false;
let speechRec = null;
let imageBase64 = null;
let healthImageBase64 = null;

// ─── COMPREHENSIVE TRANSLATIONS ──────────────────────
const T = {
  en: {
    // Login screen
    'loginTagline': 'AI Dairy Assistant',
    'lblMobile': 'Mobile Number',
    'lblPassword': 'Password',
    'loginBtn': 'Login',
    'loginFooter': 'Demo: any number + any password',
    // Header
    'h-sub': 'Voice-Based AI Dairy Assistant',
    'logoutBtn': 'Logout',
    // Nav
    'nav-home': '🏠 Home',
    'nav-health': '🩺 Health',
    'nav-breed': '🌱 Breeding',
    'nav-feed': '🌾 Feed',
    'nav-herd': '📋 My Herd',
    // Home panel
    'hero-title': '🐄 Welcome to GAU SAARTHI',
    'hero-desc': 'Your AI-powered dairy companion. Speak naturally, share a photo, and get expert guidance on animal health, breeding, and feeding – right now, in your language.',
    'qa-title': 'Quick AI Advisory',
    'qa-label': "Describe your animal's problem in your own words",
    'qa-animal': 'Animal Type',
    'qa-concern': 'Main Concern',
    'qa-btn': 'Get AI Advisory',
    'ai-resp-title': 'AI Advisory',
    'fg-title': 'Core Features',
    'alerts-title': "Today's Alerts",
    'fc1': 'Animal Health Monitoring',
    'fc2': 'Fertility & Breeding Planner',
    'fc3': 'Feed-to-Yield Guidance',
    'fc4': 'My Herd Records',
    'fc5': 'Mastitis Early Detection',
    'fc6': 'Low-Carbon Dairy Advisor',
    // Health panel
    'ht-title': 'Animal Health & Body Condition Monitoring',
    // Breeding panel
    'bt-title': 'Fertility & Insemination Planner',
    // Feed panel
    'ft-title': 'Feed-to-Yield Guidance & Nutrition Advisor',
    // Herd panel
    'hrd-title': 'My Herd Records',
    // Buttons
    'btn-get-ai-advisory': '🤖 Get AI Advisory',
    'btn-clear': '🗑️ Clear',
    'btn-ai-health': '🤖 AI Health Analysis',
    'btn-save-log': '💾 Save to Log',
    'btn-check-mastitis': '🔍 Check Mastitis Risk',
    'btn-ai-breeding': '🤖 AI Breeding Advisory',
    'btn-check-heat': '✅ Check Heat Signs',
    'btn-save-insem': '💾 Save Record',
    'btn-ai-feed': '🤖 AI Feed Recommendation',
    'btn-predict-yield': '📊 Predict Milk Yield',
    'btn-carbon': '🌱 Get Low-Carbon Advisory',
    'btn-add-animal': '➕ Add Animal',
    'btn-save-animal': '💾 Save Animal',
    'btn-cancel': 'Cancel',
    'btn-ai-summary': '🤖 AI Full Health Summary',
    'btn-listen': '🔊 Listen to Advisory',
    // Labels — Health form
    'lbl-select-animal': 'Select Animal',
    'lbl-obs-date': 'Date of Observation',
    'lbl-milk-yield': 'Milk Yield Today (Litres)',
    'lbl-body-temp': 'Body Temperature (°F)',
    'lbl-bcs': 'Body Condition Score (1–5)',
    'lbl-appetite': 'Appetite',
    'lbl-symptoms': 'Visible Symptoms (select all that apply)',
    'lbl-add-notes': 'Additional Notes',
    'lbl-upload-health': '📷 Upload Photo of Affected Area',
    // Labels — Breeding form
    'lbl-breed-animal': 'Select Animal',
    'lbl-last-heat': 'Last Heat Date',
    'lbl-last-calving': 'Last Calving Date',
    'lbl-insem-animal': 'Animal',
    'lbl-insem-date': 'Insemination Date',
    'lbl-bull-type': 'Bull / Semen Type',
    'lbl-done-by': 'Done By',
    // Labels — Feed form
    'lbl-feed-animal': 'Animal Type & Breed',
    'lbl-body-weight': 'Body Weight (kg)',
    'lbl-feed-milk': 'Current Daily Milk Yield (L)',
    'lbl-lact-stage': 'Lactation Stage',
    'lbl-feed-resources': 'Available Local Feed Resources',
    'lbl-pred-breed': 'Breed',
    'lbl-pred-age': 'Age (years)',
    'lbl-pred-parity': 'Parity (Lactation #)',
    'lbl-pred-bcs': 'BCS',
    'lbl-herd-size': 'Herd Size',
    'lbl-manure': 'Manure Management',
    'lbl-carbon-milk': 'Average Daily Milk Yield / Animal (L)',
    // Labels — Herd form
    'lbl-new-name': 'Animal Name / Tag ID',
    'lbl-species': 'Species',
    'lbl-breed-input': 'Breed',
    'lbl-dob': 'Date of Birth',
    'lbl-purchase-date': 'Purchase / Calving Date',
    'lbl-new-bcs': 'Current BCS',
    // Card titles
    'card-log-health': '📝 Log Health Observation',
    'card-mastitis': '🔬 Mastitis Risk Checker',
    'card-health-log': '📅 Health Log',
    'card-cycle': '📅 Estrus Cycle Tracker',
    'card-cycle-status': '⏱️ Cycle Status',
    'card-heat-checklist': '📋 Heat Signs Checklist',
    'card-insem': '💉 Insemination Record',
    'card-feed-rec': '🌿 Get Feed Recommendation (ICAR Norms)',
    'card-yield-pred': '📈 Milk Yield Predictor',
    'card-carbon': '🌍 Low-Carbon Dairy Advisor',
    'card-add-animal': '➕ Register New Animal',
    'card-herd-overview': '📊 Herd Overview',
    // Placeholders
    'ph-problem': 'e.g. My cow is eating less and milk production has dropped...',
    'ph-milk': 'e.g. 8.5',
    'ph-temp': 'Normal: 101–102.5',
    'ph-days-calving': 'e.g. 45',
    'ph-body-weight': 'e.g. 400',
    'ph-feed-milk': 'e.g. 10',
    'ph-pred-age': 'e.g. 4',
    'ph-pred-parity': 'e.g. 2',
    'ph-herd-size': 'e.g. 5',
    'ph-carbon-milk': 'e.g. 8',
    'ph-new-name': 'e.g. Lakshmi or #005',
    'ph-new-breed': 'e.g. HF Cross',
    'ph-bull-type': 'e.g. HF Cross, Jersey...',
    'ph-notes': 'Any other observations...',
    'lbl-udder-condition': 'Udder Condition',
    'lbl-milk-appearance': 'Milk Appearance',
    'lbl-days-calving': 'Days Since Last Calving',
    // Footer
    'footer-line1': '🐄 GAU SAARTHI – Voice-Based AI Dairy Decision Support | Powered by Claude AI | ICAR & NDDB Aligned | Team M-Square',
    'footer-line2': 'Mehakpreet Kaur & Midushi Maheshwari | This is an advisory tool only – always consult a veterinarian for medical decisions.',
  },

  hi: {
    'loginTagline': 'AI डेयरी सहायक',
    'lblMobile': 'मोबाइल नंबर',
    'lblPassword': 'पासवर्ड',
    'loginBtn': 'लॉगिन करें',
    'loginFooter': 'डेमो: कोई भी नंबर + कोई भी पासवर्ड',
    'h-sub': 'आवाज़-आधारित AI डेयरी सहायक',
    'logoutBtn': 'लॉग आउट',
    'nav-home': '🏠 होम',
    'nav-health': '🩺 स्वास्थ्य',
    'nav-breed': '🌱 प्रजनन',
    'nav-feed': '🌾 चारा',
    'nav-herd': '📋 मेरा झुंड',
    'hero-title': '🐄 गाऊ सारथी में स्वागत है',
    'hero-desc': 'आपका AI-आधारित डेयरी सहायक। अपनी भाषा में बोलें, फोटो शेयर करें, और पशु स्वास्थ्य, प्रजनन और पोषण पर विशेषज्ञ सलाह पाएं।',
    'qa-title': 'त्वरित AI सलाह',
    'qa-label': 'अपने पशु की समस्या अपने शब्दों में बताइए',
    'qa-animal': 'पशु का प्रकार',
    'qa-concern': 'मुख्य समस्या',
    'qa-btn': 'AI सलाह लें',
    'ai-resp-title': 'AI सलाह',
    'fg-title': 'मुख्य सुविधाएं',
    'alerts-title': 'आज की चेतावनियां',
    'fc1': 'पशु स्वास्थ्य निगरानी',
    'fc2': 'प्रजनन योजनाकार',
    'fc3': 'चारा-से-उपज मार्गदर्शन',
    'fc4': 'मेरा झुंड',
    'fc5': 'मास्टिटिस शीघ्र पहचान',
    'fc6': 'कम-कार्बन डेयरी सलाहकार',
    'ht-title': 'पशु स्वास्थ्य और शारीरिक स्थिति की निगरानी',
    'bt-title': 'प्रजनन और गर्भाधान योजनाकार',
    'ft-title': 'चारा-से-उपज मार्गदर्शन और पोषण सलाहकार',
    'hrd-title': 'मेरे झुंड के रिकॉर्ड',
    'btn-get-ai-advisory': '🤖 AI सलाह लें',
    'btn-clear': '🗑️ साफ़ करें',
    'btn-ai-health': '🤖 AI स्वास्थ्य विश्लेषण',
    'btn-save-log': '💾 लॉग में सहेजें',
    'btn-check-mastitis': '🔍 मास्टिटिस जोखिम जांचें',
    'btn-ai-breeding': '🤖 AI प्रजनन सलाह',
    'btn-check-heat': '✅ गर्मी के संकेत जांचें',
    'btn-save-insem': '💾 रिकॉर्ड सहेजें',
    'btn-ai-feed': '🤖 AI चारा सिफारिश',
    'btn-predict-yield': '📊 दूध उत्पादन पूर्वानुमान',
    'btn-carbon': '🌱 कम-कार्बन सलाह लें',
    'btn-add-animal': '➕ पशु जोड़ें',
    'btn-save-animal': '💾 पशु सहेजें',
    'btn-cancel': 'रद्द करें',
    'btn-ai-summary': '🤖 AI पूर्ण स्वास्थ्य सारांश',
    'btn-listen': '🔊 सलाह सुनें',
    'lbl-select-animal': 'पशु चुनें',
    'lbl-obs-date': 'निरीक्षण की तारीख',
    'lbl-milk-yield': 'आज का दूध उत्पादन (लीटर)',
    'lbl-body-temp': 'शरीर का तापमान (°F)',
    'lbl-bcs': 'शारीरिक स्थिति स्कोर (1–5)',
    'lbl-appetite': 'भूख',
    'lbl-symptoms': 'दिखाई देने वाले लक्षण (सभी चुनें)',
    'lbl-add-notes': 'अतिरिक्त नोट्स',
    'lbl-upload-health': '📷 प्रभावित क्षेत्र की फोटो अपलोड करें',
    'lbl-breed-animal': 'पशु चुनें',
    'lbl-last-heat': 'अंतिम गर्मी की तारीख',
    'lbl-last-calving': 'अंतिम प्रसव की तारीख',
    'lbl-insem-animal': 'पशु',
    'lbl-insem-date': 'गर्भाधान की तारीख',
    'lbl-bull-type': 'बैल / वीर्य प्रकार',
    'lbl-done-by': 'किसने किया',
    'lbl-feed-animal': 'पशु प्रकार और नस्ल',
    'lbl-body-weight': 'शरीर का वजन (किग्रा)',
    'lbl-feed-milk': 'वर्तमान दैनिक दूध उत्पादन (लीटर)',
    'lbl-lact-stage': 'दुग्धकाल की अवस्था',
    'lbl-feed-resources': 'उपलब्ध स्थानीय चारा संसाधन',
    'lbl-pred-breed': 'नस्ल',
    'lbl-pred-age': 'आयु (वर्ष)',
    'lbl-pred-parity': 'पैरिटी (दुग्धकाल #)',
    'lbl-pred-bcs': 'BCS',
    'lbl-herd-size': 'झुंड का आकार',
    'lbl-manure': 'खाद प्रबंधन',
    'lbl-carbon-milk': 'औसत दैनिक दूध उत्पादन / पशु (लीटर)',
    'lbl-new-name': 'पशु का नाम / टैग ID',
    'lbl-species': 'प्रजाति',
    'lbl-breed-input': 'नस्ल',
    'lbl-dob': 'जन्म तिथि',
    'lbl-purchase-date': 'खरीद / प्रसव की तारीख',
    'lbl-new-bcs': 'वर्तमान BCS',
    'card-log-health': '📝 स्वास्थ्य अवलोकन दर्ज करें',
    'card-mastitis': '🔬 मास्टिटिस जोखिम जांचकर्ता',
    'card-health-log': '📅 स्वास्थ्य लॉग',
    'card-cycle': '📅 गर्मी चक्र ट्रैकर',
    'card-cycle-status': '⏱️ चक्र की स्थिति',
    'card-heat-checklist': '📋 गर्मी संकेत चेकलिस्ट',
    'card-insem': '💉 गर्भाधान रिकॉर्ड',
    'card-feed-rec': '🌿 चारा सिफारिश प्राप्त करें (ICAR मानक)',
    'card-yield-pred': '📈 दूध उत्पादन पूर्वानुमान',
    'card-carbon': '🌍 कम-कार्बन डेयरी सलाहकार',
    'card-add-animal': '➕ नया पशु पंजीकृत करें',
    'card-herd-overview': '📊 झुंड का अवलोकन',
    'ph-problem': 'जैसे: मेरी गाय कम खा रही है और दूध कम हो गया है...',
    'ph-milk': 'जैसे: 8.5',
    'ph-temp': 'सामान्य: 101–102.5',
    'ph-days-calving': 'जैसे: 45',
    'ph-body-weight': 'जैसे: 400',
    'ph-feed-milk': 'जैसे: 10',
    'ph-pred-age': 'जैसे: 4',
    'ph-pred-parity': 'जैसे: 2',
    'ph-herd-size': 'जैसे: 5',
    'ph-carbon-milk': 'जैसे: 8',
    'ph-new-name': 'जैसे: लक्ष्मी या #005',
    'ph-new-breed': 'जैसे: HF Cross',
    'ph-bull-type': 'जैसे: HF Cross, Jersey...',
    'ph-notes': 'कोई अन्य टिप्पणी...',
    'lbl-udder-condition': 'थन की स्थिति',
    'lbl-milk-appearance': 'दूध का रूप',
    'lbl-days-calving': 'पिछले प्रसव के बाद के दिन',
    'footer-line1': '🐄 गाऊ सारथी – आवाज़-आधारित AI डेयरी निर्णय समर्थन | Claude AI द्वारा संचालित | ICAR और NDDB संरेखित | टीम M-Square',
    'footer-line2': 'मेहकप्रीत कौर और मिदुशी माहेश्वरी | यह केवल एक सलाहकार उपकरण है – चिकित्सा निर्णयों के लिए हमेशा पशु चिकित्सक से परामर्श करें।',
  },

  pa: {
    'loginTagline': 'AI ਡੇਅਰੀ ਸਹਾਇਕ',
    'lblMobile': 'ਮੋਬਾਈਲ ਨੰਬਰ',
    'lblPassword': 'ਪਾਸਵਰਡ',
    'loginBtn': 'ਲੌਗਇਨ ਕਰੋ',
    'loginFooter': 'ਡੈਮੋ: ਕੋਈ ਵੀ ਨੰਬਰ + ਕੋਈ ਵੀ ਪਾਸਵਰਡ',
    'h-sub': 'ਅਵਾਜ਼-ਆਧਾਰਿਤ AI ਡੇਅਰੀ ਸਹਾਇਕ',
    'logoutBtn': 'ਲੌਗਆਊਟ',
    'nav-home': '🏠 ਹੋਮ',
    'nav-health': '🩺 ਸਿਹਤ',
    'nav-breed': '🌱 ਪ੍ਰਜਨਨ',
    'nav-feed': '🌾 ਚਾਰਾ',
    'nav-herd': '📋 ਮੇਰਾ ਝੁੰਡ',
    'hero-title': '🐄 ਗਊ ਸਾਰਥੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    'hero-desc': 'ਤੁਹਾਡਾ AI-ਆਧਾਰਿਤ ਡੇਅਰੀ ਸਹਾਇਕ। ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ, ਫੋਟੋ ਸਾਂਝੀ ਕਰੋ, ਅਤੇ ਪਸ਼ੂ ਸਿਹਤ, ਪ੍ਰਜਨਨ ਅਤੇ ਪੋਸ਼ਣ ਬਾਰੇ ਮਾਹਰ ਸਲਾਹ ਲਓ।',
    'qa-title': 'ਤੁਰੰਤ AI ਸਲਾਹ',
    'qa-label': 'ਆਪਣੇ ਪਸ਼ੂ ਦੀ ਸਮੱਸਿਆ ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਦੱਸੋ',
    'qa-animal': 'ਪਸ਼ੂ ਦੀ ਕਿਸਮ',
    'qa-concern': 'ਮੁੱਖ ਚਿੰਤਾ',
    'qa-btn': 'AI ਸਲਾਹ ਲਓ',
    'ai-resp-title': 'AI ਸਲਾਹ',
    'fg-title': 'ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'alerts-title': 'ਅੱਜ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ',
    'fc1': 'ਪਸ਼ੂ ਸਿਹਤ ਨਿਗਰਾਨੀ',
    'fc2': 'ਪ੍ਰਜਨਨ ਯੋਜਨਾਕਾਰ',
    'fc3': 'ਚਾਰਾ-ਤੋਂ-ਉਪਜ ਮਾਰਗਦਰਸ਼ਨ',
    'fc4': 'ਮੇਰਾ ਝੁੰਡ',
    'fc5': 'ਮਾਸਟਾਈਟਿਸ ਸ਼ੁਰੂਆਤੀ ਖੋਜ',
    'fc6': 'ਘੱਟ-ਕਾਰਬਨ ਡੇਅਰੀ ਸਲਾਹਕਾਰ',
    'ht-title': 'ਪਸ਼ੂ ਸਿਹਤ ਅਤੇ ਸਰੀਰਕ ਸਥਿਤੀ ਦੀ ਨਿਗਰਾਨੀ',
    'bt-title': 'ਉਪਜਾਊ ਸ਼ਕਤੀ ਅਤੇ ਗਰਭਧਾਰਨ ਯੋਜਨਾਕਾਰ',
    'ft-title': 'ਚਾਰਾ-ਤੋਂ-ਉਪਜ ਮਾਰਗਦਰਸ਼ਨ ਅਤੇ ਪੋਸ਼ਣ ਸਲਾਹਕਾਰ',
    'hrd-title': 'ਮੇਰੇ ਝੁੰਡ ਦੇ ਰਿਕਾਰਡ',
    'btn-get-ai-advisory': '🤖 AI ਸਲਾਹ ਲਓ',
    'btn-clear': '🗑️ ਸਾਫ਼ ਕਰੋ',
    'btn-ai-health': '🤖 AI ਸਿਹਤ ਵਿਸ਼ਲੇਸ਼ਣ',
    'btn-save-log': '💾 ਲੌਗ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਕਰੋ',
    'btn-check-mastitis': '🔍 ਮਾਸਟਾਈਟਿਸ ਜੋਖਮ ਜਾਂਚੋ',
    'btn-ai-breeding': '🤖 AI ਪ੍ਰਜਨਨ ਸਲਾਹ',
    'btn-check-heat': '✅ ਗਰਮੀ ਦੇ ਸੰਕੇਤ ਜਾਂਚੋ',
    'btn-save-insem': '💾 ਰਿਕਾਰਡ ਸੁਰੱਖਿਅਤ ਕਰੋ',
    'btn-ai-feed': '🤖 AI ਚਾਰਾ ਸਿਫਾਰਿਸ਼',
    'btn-predict-yield': '📊 ਦੁੱਧ ਉਤਪਾਦਨ ਪੂਰਵ-ਅਨੁਮਾਨ',
    'btn-carbon': '🌱 ਘੱਟ-ਕਾਰਬਨ ਸਲਾਹ ਲਓ',
    'btn-add-animal': '➕ ਪਸ਼ੂ ਜੋੜੋ',
    'btn-save-animal': '💾 ਪਸ਼ੂ ਸੁਰੱਖਿਅਤ ਕਰੋ',
    'btn-cancel': 'ਰੱਦ ਕਰੋ',
    'btn-ai-summary': '🤖 AI ਪੂਰਾ ਸਿਹਤ ਸਾਰਾਂਸ਼',
    'btn-listen': '🔊 ਸਲਾਹ ਸੁਣੋ',
    'lbl-select-animal': 'ਪਸ਼ੂ ਚੁਣੋ',
    'lbl-obs-date': 'ਨਿਰੀਖਣ ਦੀ ਮਿਤੀ',
    'lbl-milk-yield': 'ਅੱਜ ਦਾ ਦੁੱਧ ਉਤਪਾਦਨ (ਲੀਟਰ)',
    'lbl-body-temp': 'ਸਰੀਰ ਦਾ ਤਾਪਮਾਨ (°F)',
    'lbl-bcs': 'ਸਰੀਰਕ ਸਥਿਤੀ ਸਕੋਰ (1–5)',
    'lbl-appetite': 'ਭੁੱਖ',
    'lbl-symptoms': 'ਦਿਖਾਈ ਦੇਣ ਵਾਲੇ ਲੱਛਣ (ਸਭ ਚੁਣੋ)',
    'lbl-add-notes': 'ਵਾਧੂ ਨੋਟਸ',
    'lbl-upload-health': '📷 ਪ੍ਰਭਾਵਿਤ ਥਾਂ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ',
    'lbl-breed-animal': 'ਪਸ਼ੂ ਚੁਣੋ',
    'lbl-last-heat': 'ਪਿਛਲੀ ਗਰਮੀ ਦੀ ਮਿਤੀ',
    'lbl-last-calving': 'ਪਿਛਲੇ ਜਣੇਪੇ ਦੀ ਮਿਤੀ',
    'lbl-insem-animal': 'ਪਸ਼ੂ',
    'lbl-insem-date': 'ਗਰਭਧਾਰਨ ਦੀ ਮਿਤੀ',
    'lbl-bull-type': 'ਸਾਂਡ / ਵੀਰਜ ਕਿਸਮ',
    'lbl-done-by': 'ਕਿਸ ਨੇ ਕੀਤਾ',
    'lbl-feed-animal': 'ਪਸ਼ੂ ਕਿਸਮ ਅਤੇ ਨਸਲ',
    'lbl-body-weight': 'ਸਰੀਰ ਦਾ ਭਾਰ (ਕਿਗ੍ਰਾ)',
    'lbl-feed-milk': 'ਮੌਜੂਦਾ ਰੋਜ਼ਾਨਾ ਦੁੱਧ ਉਤਪਾਦਨ (ਲੀਟਰ)',
    'lbl-lact-stage': 'ਦੁੱਧ ਚੁਆਈ ਦੀ ਅਵਸਥਾ',
    'lbl-feed-resources': 'ਉਪਲਬਧ ਸਥਾਨਕ ਚਾਰਾ ਸਰੋਤ',
    'lbl-pred-breed': 'ਨਸਲ',
    'lbl-pred-age': 'ਉਮਰ (ਸਾਲ)',
    'lbl-pred-parity': 'ਪੈਰਿਟੀ (ਦੁੱਧ ਚੁਆਈ #)',
    'lbl-pred-bcs': 'BCS',
    'lbl-herd-size': 'ਝੁੰਡ ਦਾ ਆਕਾਰ',
    'lbl-manure': 'ਖਾਦ ਪ੍ਰਬੰਧਨ',
    'lbl-carbon-milk': 'ਔਸਤ ਰੋਜ਼ਾਨਾ ਦੁੱਧ / ਪਸ਼ੂ (ਲੀਟਰ)',
    'lbl-new-name': 'ਪਸ਼ੂ ਦਾ ਨਾਮ / ਟੈਗ ID',
    'lbl-species': 'ਜਾਤੀ',
    'lbl-breed-input': 'ਨਸਲ',
    'lbl-dob': 'ਜਨਮ ਮਿਤੀ',
    'lbl-purchase-date': 'ਖਰੀਦ / ਜਣੇਪੇ ਦੀ ਮਿਤੀ',
    'lbl-new-bcs': 'ਮੌਜੂਦਾ BCS',
    'card-log-health': '📝 ਸਿਹਤ ਨਿਰੀਖਣ ਦਰਜ ਕਰੋ',
    'card-mastitis': '🔬 ਮਾਸਟਾਈਟਿਸ ਜੋਖਮ ਜਾਂਚਕਰਤਾ',
    'card-health-log': '📅 ਸਿਹਤ ਲੌਗ',
    'card-cycle': '📅 ਗਰਮੀ ਚੱਕਰ ਟ੍ਰੈਕਰ',
    'card-cycle-status': '⏱️ ਚੱਕਰ ਦੀ ਸਥਿਤੀ',
    'card-heat-checklist': '📋 ਗਰਮੀ ਸੰਕੇਤ ਚੈੱਕਲਿਸਟ',
    'card-insem': '💉 ਗਰਭਧਾਰਨ ਰਿਕਾਰਡ',
    'card-feed-rec': '🌿 ਚਾਰਾ ਸਿਫਾਰਿਸ਼ ਲਓ (ICAR ਮਾਪਦੰਡ)',
    'card-yield-pred': '📈 ਦੁੱਧ ਉਤਪਾਦਨ ਪੂਰਵ-ਅਨੁਮਾਨ',
    'card-carbon': '🌍 ਘੱਟ-ਕਾਰਬਨ ਡੇਅਰੀ ਸਲਾਹਕਾਰ',
    'card-add-animal': '➕ ਨਵਾਂ ਪਸ਼ੂ ਰਜਿਸਟਰ ਕਰੋ',
    'card-herd-overview': '📊 ਝੁੰਡ ਦਾ ਅਵਲੋਕਨ',
    'ph-problem': 'ਜਿਵੇਂ: ਮੇਰੀ ਗਾਂ ਘੱਟ ਖਾ ਰਹੀ ਹੈ ਅਤੇ ਦੁੱਧ ਘੱਟ ਹੋ ਗਿਆ ਹੈ...',
    'ph-milk': 'ਜਿਵੇਂ: 8.5',
    'ph-temp': 'ਸਾਧਾਰਨ: 101–102.5',
    'ph-days-calving': 'ਜਿਵੇਂ: 45',
    'ph-body-weight': 'ਜਿਵੇਂ: 400',
    'ph-feed-milk': 'ਜਿਵੇਂ: 10',
    'ph-pred-age': 'ਜਿਵੇਂ: 4',
    'ph-pred-parity': 'ਜਿਵੇਂ: 2',
    'ph-herd-size': 'ਜਿਵੇਂ: 5',
    'ph-carbon-milk': 'ਜਿਵੇਂ: 8',
    'ph-new-name': 'ਜਿਵੇਂ: ਲਕਸ਼ਮੀ ਜਾਂ #005',
    'ph-new-breed': 'ਜਿਵੇਂ: HF Cross',
    'ph-bull-type': 'ਜਿਵੇਂ: HF Cross, Jersey...',
    'ph-notes': 'ਕੋਈ ਹੋਰ ਟਿੱਪਣੀ...',
    'lbl-udder-condition': 'ਥਣ ਦੀ ਸਥਿਤੀ',
    'lbl-milk-appearance': 'ਦੁੱਧ ਦੀ ਦਿੱਖ',
    'lbl-days-calving': 'ਪਿਛਲੇ ਜਣੇਪੇ ਤੋਂ ਬਾਅਦ ਦੇ ਦਿਨ',
    'footer-line1': '🐄 ਗਊ ਸਾਰਥੀ – ਅਵਾਜ਼-ਆਧਾਰਿਤ AI ਡੇਅਰੀ ਫੈਸਲਾ ਸਹਾਇਤਾ | Claude AI ਦੁਆਰਾ ਸੰਚਾਲਿਤ | ICAR ਅਤੇ NDDB ਅਨੁਕੂਲਿਤ | ਟੀਮ M-Square',
    'footer-line2': 'ਮਹਿਕਪ੍ਰੀਤ ਕੌਰ ਅਤੇ ਮਿਦੁਸ਼ੀ ਮਾਹੇਸ਼ਵਰੀ | ਇਹ ਸਿਰਫ਼ ਇੱਕ ਸਲਾਹਕਾਰ ਸਾਧਨ ਹੈ – ਡਾਕਟਰੀ ਫੈਸਲਿਆਂ ਲਈ ਹਮੇਸ਼ਾ ਪਸ਼ੂ ਚਿਕਿਤਸਕ ਨਾਲ ਸਲਾਹ ਕਰੋ।',
  }
};

// ─── DROPDOWN OPTIONS ─────────────────────────────────
const OPTS = {
  // id -> { en: [...], hi: [...], pa: [...] }
  animalType: {
    en: ['🐄 Cow', '🐃 Buffalo', '🐮 Calf'],
    hi: ['🐄 गाय', '🐃 भैंस', '🐮 बछड़ा'],
    pa: ['🐄 ਗਾਂ', '🐃 ਮੱਝ', '🐮 ਵੱਛਾ']
  },
  concernType: {
    en: ['General Health','Milk Production Drop','Udder / Mastitis','Heat / Breeding','Feeding / Nutrition','Injury / Lameness','Respiratory / Fever','Digestion / Bloating'],
    hi: ['सामान्य स्वास्थ्य','दूध उत्पादन में कमी','थन / मास्टिटिस','गर्मी / प्रजनन','चारा / पोषण','चोट / लंगड़ापन','श्वसन / बुखार','पाचन / पेट फूलना'],
    pa: ['ਆਮ ਸਿਹਤ','ਦੁੱਧ ਉਤਪਾਦਨ ਵਿੱਚ ਕਮੀ','ਥਣ / ਮਾਸਟਾਈਟਿਸ','ਗਰਮੀ / ਪ੍ਰਜਨਨ','ਚਾਰਾ / ਪੋਸ਼ਣ','ਸੱਟ / ਲੰਗੜਾਪਣ','ਸਾਹ / ਬੁਖਾਰ','ਪਾਚਨ / ਪੇਟ ਫੁੱਲਣਾ']
  },
  healthAnimal: {
    en: ['Gauri – Cow #1','Rani – Cow #2','Kali – Buffalo #1','+ Add New Animal'],
    hi: ['ਗੌਰੀ – ਗਾਂ #1','ਰਾਣੀ – ਗਾਂ #2','ਕਾਲੀ – ਮੱਝ #1','+ ਨਵਾਂ ਪਸ਼ੂ ਜੋੜੋ'],
    pa: ['ਗੌਰੀ – ਗਾਂ #1','ਰਾਣੀ – ਗਾਂ #2','ਕਾਲੀ – ਮੱਝ #1','+ ਨਵਾਂ ਪਸ਼ੂ ਜੋੜੋ']
  },
  bcs: {
    en: ['1 – Very Thin','2 – Thin','3 – Ideal','4 – Fat','5 – Very Fat'],
    hi: ['1 – बहुत पतला','2 – पतला','3 – आदर्श','4 – मोटा','5 – बहुत मोटा'],
    pa: ['1 – ਬਹੁਤ ਪਤਲਾ','2 – ਪਤਲਾ','3 – ਆਦਰਸ਼','4 – ਮੋਟਾ','5 – ਬਹੁਤ ਮੋਟਾ']
  },
  appetite: {
    en: ['Normal','Reduced','Not Eating'],
    hi: ['सामान्य','कम','नहीं खा रहा'],
    pa: ['ਸਾਧਾਰਨ','ਘੱਟ','ਨਹੀਂ ਖਾ ਰਿਹਾ']
  },
  mastitisAnimal: {
    en: ['Gauri – Cow #1','Rani – Cow #2','Kali – Buffalo #1'],
    hi: ['गौरी – गाय #1','रानी – गाय #2','काली – भैंस #1'],
    pa: ['ਗੌਰੀ – ਗਾਂ #1','ਰਾਣੀ – ਗਾਂ #2','ਕਾਲੀ – ਮੱਝ #1']
  },
  udderCondition: {
    en: ['Normal – Soft, Even','Slightly Hard / One Quarter','Very Hard / Hot / Painful','Asymmetric Quarters'],
    hi: ['सामान्य – मुलायम, समान','थोड़ा कठोर / एक तिमाही','बहुत कठोर / गर्म / दर्दनाक','असमान तिमाहियां'],
    pa: ['ਸਾਧਾਰਨ – ਨਰਮ, ਸਮਾਨ','ਥੋੜਾ ਕਠੋਰ / ਇੱਕ ਤਿਮਾਹੀ','ਬਹੁਤ ਕਠੋਰ / ਗਰਮ / ਦਰਦਨਾਕ','ਅਸਮਾਨ ਤਿਮਾਹੀਆਂ']
  },
  milkAppearance: {
    en: ['Normal White / Creamy','Watery / Thin','Flakes / Clots','Bloody / Pink','Yellowish / Green'],
    hi: ['सामान्य सफेद / मलाईदार','पतला / पानी जैसा','ढेले / थक्के','खूनी / गुलाबी','पीलापन / हरापन'],
    pa: ['ਸਾਧਾਰਨ ਚਿੱਟਾ / ਕਰੀਮੀ','ਪਤਲਾ / ਪਾਣੀ ਵਰਗਾ','ਟੁਕੜੇ / ਗੁੱਠੇ','ਖੂਨੀ / ਗੁਲਾਬੀ','ਪੀਲਾਪਣ / ਹਰਾਪਣ']
  },
  breedAnimal: {
    en: ['Gauri – Cow #1','Rani – Cow #2','Kali – Buffalo #1'],
    hi: ['गौरी – गाय #1','रानी – गाय #2','काली – भैंस #1'],
    pa: ['ਗੌਰੀ – ਗਾਂ #1','ਰਾਣੀ – ਗਾਂ #2','ਕਾਲੀ – ਮੱਝ #1']
  },
  aiAnimal: {
    en: ['Gauri – Cow #1','Rani – Cow #2','Kali – Buffalo #1'],
    hi: ['गौरी – गाय #1','रानी – गाय #2','काली – भैंस #1'],
    pa: ['ਗੌਰੀ – ਗਾਂ #1','ਰਾਣੀ – ਗਾਂ #2','ਕਾਲੀ – ਮੱਝ #1']
  },
  aiBy: {
    en: ['Government AI Center','Private Vet','Co-operative'],
    hi: ['सरकारी AI केंद्र','निजी पशु चिकित्सक','सहकारी संस्था'],
    pa: ['ਸਰਕਾਰੀ AI ਕੇਂਦਰ','ਪ੍ਰਾਈਵੇਟ ਪਸ਼ੂ ਚਿਕਿਤਸਕ','ਸਹਿਕਾਰੀ ਸੰਸਥਾ']
  },
  feedAnimalType: {
    en: ['HF Cross Cow','Jersey Cow','Sahiwal (Indigenous)','Murrah Buffalo','Jaffarabadi Buffalo'],
    hi: ['HF क्रॉस गाय','जर्सी गाय','साहीवाल (देशी)','मुर्राह भैंस','जाफराबादी भैंस'],
    pa: ['HF ਕ੍ਰਾਸ ਗਾਂ','ਜਰਸੀ ਗਾਂ','ਸਾਹੀਵਾਲ (ਦੇਸੀ)','ਮੁੱਰਾਹ ਮੱਝ','ਜਾਫਰਾਬਾਦੀ ਮੱਝ']
  },
  lactStage: {
    en: ['Early (0–3 months)','Mid (3–6 months)','Late (6+ months)','Dry Period'],
    hi: ['शुरुआती (0–3 महीने)','मध्य (3–6 महीने)','देर (6+ महीने)','सूखा काल'],
    pa: ['ਸ਼ੁਰੂਆਤੀ (0–3 ਮਹੀਨੇ)','ਮੱਧ (3–6 ਮਹੀਨੇ)','ਦੇਰ (6+ ਮਹੀਨੇ)','ਸੁੱਕਾ ਕਾਲ']
  },
  predBreed: {
    en: ['HF Cross','Jersey','Sahiwal','Murrah Buffalo'],
    hi: ['HF क्रॉस','जर्सी','साहीवाल','मुर्राह भैंस'],
    pa: ['HF ਕ੍ਰਾਸ','ਜਰਸੀ','ਸਾਹੀਵਾਲ','ਮੁੱਰਾਹ ਮੱਝ']
  },
  predBCS: {
    en: ['2 – Thin','3 – Ideal','4 – Fat'],
    hi: ['2 – पतला','3 – आदर्श','4 – मोटा'],
    pa: ['2 – ਪਤਲਾ','3 – ਆਦਰਸ਼','4 – ਮੋਟਾ']
  },
  manureMethod: {
    en: ['Open dumping','Composting','Biogas Plant','Direct field use'],
    hi: ['खुला डम्पिंग','कम्पोस्टिंग','बायोगैस प्लांट','सीधे खेत में उपयोग'],
    pa: ['ਖੁੱਲ੍ਹੀ ਡੰਪਿੰਗ','ਕੰਪੋਸਟਿੰਗ','ਬਾਇਓਗੈਸ ਪਲਾਂਟ','ਸਿੱਧੀ ਖੇਤ ਵਰਤੋਂ']
  },
  newSpecies: {
    en: ['Cow','Buffalo','Calf'],
    hi: ['गाय','भैंस','बछड़ा'],
    pa: ['ਗਾਂ','ਮੱਝ','ਵੱਛਾ']
  }
};

// ─── SYMPTOM LABELS ──────────────────────────────────
const SYMPTOMS = {
  en: ['Udder Swelling','Limping / Lameness','Loose Stool / Diarrhea','Nasal Discharge','Restlessness','Bloating','Lethargy / Dull Eyes','Abnormal Milk (watery/bloody)'],
  hi: ['थन में सूजन','लंगड़ापन','पतला मल / दस्त','नाक से स्राव','बेचैनी','पेट फूलना','सुस्ती / सुस्त आंखें','असामान्य दूध (पानी जैसा/खूनी)'],
  pa: ['ਥਣ ਵਿੱਚ ਸੋਜ','ਲੰਗੜਾਪਣ','ਪਤਲਾ ਮਲ / ਦਸਤ','ਨੱਕ ਤੋਂ ਨਿਕਾਸ','ਬੇਚੈਨੀ','ਪੇਟ ਫੁੱਲਣਾ','ਸੁਸਤੀ / ਧੁੰਦਲੀਆਂ ਅੱਖਾਂ','ਅਸਾਧਾਰਨ ਦੁੱਧ (ਪਾਣੀ ਵਰਗਾ/ਖੂਨੀ)']
};

// ─── HEAT SIGN LABELS ────────────────────────────────
const HEAT_SIGNS = {
  en: ['Mounting other animals or being mounted','Clear mucus discharge from vulva','Restlessness / increased activity','Swollen or reddened vulva','Reduced feed intake','Milk drop (temporary)'],
  hi: ['दूसरे पशुओं पर चढ़ना या चढ़वाना','योनि से साफ म्यूकस स्राव','बेचैनी / बढ़ी हुई गतिविधि','सूजी हुई या लाल योनि','चारे की कम खपत','दूध में अस्थायी गिरावट'],
  pa: ['ਦੂਜੇ ਪਸ਼ੂਆਂ ਉੱਤੇ ਚੜ੍ਹਨਾ ਜਾਂ ਚੜ੍ਹਵਾਉਣਾ','ਯੋਨੀ ਤੋਂ ਸਾਫ਼ ਬਲਗਮ ਨਿਕਾਸ','ਬੇਚੈਨੀ / ਵੱਧੀ ਗਤੀਵਿਧੀ','ਸੁੱਜੀ ਜਾਂ ਲਾਲ ਯੋਨੀ','ਚਾਰੇ ਦੀ ਘੱਟ ਖਪਤ','ਦੁੱਧ ਵਿੱਚ ਅਸਥਾਈ ਗਿਰਾਵਟ']
};

// ─── FEED CHECKBOXES ─────────────────────────────────
const FEED_ITEMS = {
  en: ['Green Fodder','Dry Straw','Cottonseed Cake','Maize Silage','Grain Mix / Concentrate','Mineral Mixture'],
  hi: ['हरा चारा','सूखा भूसा','कपास बीज खली','मक्का साइलेज','अनाज मिश्रण / कॉन्सेंट्रेट','खनिज मिश्रण'],
  pa: ['ਹਰਾ ਚਾਰਾ','ਸੁੱਕਾ ਭੂਸਾ','ਕਪਾਹ ਬੀਜ ਖਲੀ','ਮੱਕੀ ਸਾਈਲੇਜ','ਅਨਾਜ ਮਿਸ਼ਰਣ / ਕਾਨਸੈਂਟ੍ਰੇਟ','ਖਣਿਜ ਮਿਸ਼ਰਣ']
};
const FEED_IDS = ['f_green','f_dry','f_cotton','f_maize','f_grain','f_mineral'];

// ─── SET LANGUAGE ────────────────────────────────────
function setLang(lang, btn) {
  currentLang = lang;
  const map = T[lang] || T['en'];

  // 1. Update all text-content elements by ID
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    // Buttons and inputs use textContent; inputs use value differently
    if (el.tagName === 'INPUT' && el.type !== 'button') {
      // update placeholder only
    } else {
      el.textContent = map[id];
    }
  });

  // 2. Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (map[key]) el.textContent = map[key];
  });

  // 3. Update placeholders
  const phMap = {
    'problemText': 'ph-problem',
    'milkYield': 'ph-milk',
    'bodyTemp': 'ph-temp',
    'daysCalving': 'ph-days-calving',
    'bodyWeight': 'ph-body-weight',
    'feedMilkYield': 'ph-feed-milk',
    'predAge': 'ph-pred-age',
    'predParity': 'ph-pred-parity',
    'herdSize': 'ph-herd-size',
    'carbonMilk': 'ph-carbon-milk',
    'newName': 'ph-new-name',
    'newBreed': 'ph-new-breed',
    'aiType': 'ph-bull-type',
    'healthNotes': 'ph-notes'
  };
  Object.keys(phMap).forEach(inputId => {
    const el = document.getElementById(inputId);
    if (el && map[phMap[inputId]]) el.placeholder = map[phMap[inputId]];
  });

  // 4. Update dropdown options
  Object.keys(OPTS).forEach(selectId => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const opts = OPTS[selectId][lang] || OPTS[selectId]['en'];
    const vals = sel.querySelectorAll('option');
    opts.forEach((txt, i) => { if (vals[i]) vals[i].textContent = txt; });
  });

  // 5. Update symptom checkboxes
  const sympGrid = document.getElementById('symptomsGrid');
  if (sympGrid) {
    const labels = sympGrid.querySelectorAll('label');
    const syms = SYMPTOMS[lang] || SYMPTOMS['en'];
    labels.forEach((lbl, i) => {
      if (syms[i]) {
        const cb = lbl.querySelector('input');
        lbl.textContent = '';
        if (cb) lbl.appendChild(cb);
        lbl.appendChild(document.createTextNode(' ' + syms[i]));
      }
    });
  }

  // 6. Update heat sign checkboxes
  const heatGrid = document.getElementById('heatSigns');
  if (heatGrid) {
    const labels = heatGrid.querySelectorAll('label');
    const signs = HEAT_SIGNS[lang] || HEAT_SIGNS['en'];
    labels.forEach((lbl, i) => {
      if (signs[i]) {
        const cb = lbl.querySelector('input');
        lbl.textContent = '';
        if (cb) lbl.appendChild(cb);
        lbl.appendChild(document.createTextNode(' ' + signs[i]));
      }
    });
  }

  // 7. Update feed checkboxes
  FEED_IDS.forEach((id, i) => {
    const cb = document.getElementById(id);
    if (!cb) return;
    const lbl = cb.closest('label') || cb.parentElement;
    if (lbl) {
      const items = FEED_ITEMS[lang] || FEED_ITEMS['en'];
      lbl.textContent = '';
      lbl.appendChild(cb);
      lbl.appendChild(document.createTextNode(' ' + items[i]));
    }
  });

  // 8. Update card titles via data-i18n
  const cardTitleMap = {
    'card-log-health': 'card-log-health',
    'card-mastitis': 'card-mastitis',
    'card-health-log': 'card-health-log',
    'card-cycle': 'card-cycle',
    'card-cycle-status': 'card-cycle-status',
    'card-heat-checklist': 'card-heat-checklist',
    'card-insem': 'card-insem',
    'card-feed-rec': 'card-feed-rec',
    'card-yield-pred': 'card-yield-pred',
    'card-carbon': 'card-carbon',
    'card-add-animal': 'card-add-animal',
    'card-herd-overview': 'card-herd-overview'
  };
  Object.keys(cardTitleMap).forEach(key => {
    const el = document.getElementById(key);
    if (el && map[cardTitleMap[key]]) el.textContent = map[cardTitleMap[key]];
  });

  // 9. Update labels by data-i18n-label
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const key = el.dataset.i18nLabel;
    if (map[key]) el.textContent = map[key];
  });

  // 10. Sync header lang-select dropdown
  const sel = document.getElementById('langSelect');
  if (sel) sel.value = lang;

  // 11. Sync login lang tabs
  const tabs = document.getElementById('loginLangTabs');
  if (tabs) {
    tabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    const idx = ['en','hi','pa'].indexOf(lang);
    if (tabs.children[idx]) tabs.children[idx].classList.add('active');
  }
}

// ─── LOGIN / LOGOUT ───────────────────────────────────
function doLogin() {
  const mob = document.getElementById('loginMobile').value.trim();
  const pwd = document.getElementById('loginPassword').value.trim();
  const err = document.getElementById('loginError');

  if (!mob || !pwd) {
    const msgs = { en: "Please enter mobile number and password.", hi: "कृपया मोबाइल नंबर और पासवर्ड दर्ज करें।", pa: "ਕਿਰਪਾ ਕਰਕੇ ਮੋਬਾਈਲ ਨੰਬਰ ਅਤੇ ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ।" };
    err.textContent = msgs[currentLang] || msgs.en;
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';

  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('appScreen').classList.add('active');
  setLang(currentLang);
}

function doLogout() {
  document.getElementById('appScreen').classList.remove('active');
  document.getElementById('loginScreen').classList.add('active');
  document.getElementById('loginMobile').value = '';
  document.getElementById('loginPassword').value = '';
  setLang(currentLang);
}

function showSignup() {
  document.getElementById("signupForm").style.display = "block";
}

function registerUser() {
  const name = document.getElementById("signupName").value;
  const mobile = document.getElementById("signupMobile").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !mobile || !password) {
    alert("Please fill all fields");
    return;
  }

  alert("Account created successfully!");

  document.getElementById("signupForm").style.display = "none";
}

// ─── TAB SWITCHING ────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  document.querySelectorAll('[data-tab]').forEach(b => { if (b.dataset.tab === name) b.classList.add('active'); });
  // Also update nav buttons
  document.querySelectorAll('[id^=nav-]').forEach(b => b.classList.remove('active'));
  const nb = document.getElementById('nav-' + name);
  if (nb) nb.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[id^=nav-]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[id^=nav-]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ─── TOAST ───────────────────────────────────────────
function showToast(msg, duration = 2800) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ─── IMAGE PREVIEW ────────────────────────────────────
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    imageBase64 = e.target.result.split(',')[1];
    const preview = document.getElementById('imagePreview');
    preview.src = e.target.result;
    preview.style.display = 'block';
    showToast('📷 Photo loaded! AI will analyze it.');
  };
  reader.readAsDataURL(file);
}
function previewHealthImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    healthImageBase64 = e.target.result.split(',')[1];
    const preview = document.getElementById('healthImagePreview');
    preview.src = e.target.result;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// ─── VOICE INPUT ─────────────────────────────────────
function toggleVoice() {
  const btn = document.getElementById('voiceBtn');
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    const langMap = {en:'en-IN', hi:'hi-IN', pa:'pa-IN'};
    const samples = {
      en: 'My cow is eating less and milk production has reduced.',
      hi: 'मेरी गाय कम खा रही है और दूध कम दे रही है।',
      pa: 'ਮੇਰੀ ਗਾਂ ਘੱਟ ਖਾ ਰਹੀ ਹੈ ਅਤੇ ਦੁੱਧ ਘੱਟ ਦੇ ਰਹੀ ਹੈ।'
    };
    document.getElementById('problemText').value = samples[currentLang] || samples.en;
    showToast('🎤 Voice simulated (demo)');
    return;
  }
  if (isRecording) {
    speechRec && speechRec.stop();
    isRecording = false;
    btn.classList.remove('recording');
    btn.textContent = '🎤';
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  speechRec = new SpeechRecognition();
  const langMap = {en:'en-IN', hi:'hi-IN', pa:'pa-IN'};
  speechRec.lang = langMap[currentLang] || 'en-IN';
  speechRec.interimResults = false;
  speechRec.onresult = e => {
    document.getElementById('problemText').value = e.results[0][0].transcript;
    showToast('✅ Voice recorded!');
  };
  speechRec.onerror = () => showToast('❌ Voice error – try typing');
  speechRec.onend = () => { isRecording = false; btn.classList.remove('recording'); btn.textContent = '🎤'; };
  speechRec.start();
  isRecording = true;
  btn.classList.add('recording');
  btn.textContent = '⏹️';
  showToast('🎤 Recording… speak now');
}

// ─── SPEAK TEXT ──────────────────────────────────────
function speakText(text) {
  if (!text || !window.speechSynthesis) { showToast('🔇 Text-to-speech not supported'); return; }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text.substring(0, 800));
  const langMap = {en:'en-IN', hi:'hi-IN', pa:'pa-IN'};
  utter.lang = langMap[currentLang] || 'en-IN';
  utter.rate = 0.88;
  window.speechSynthesis.speak(utter);
  showToast('🔊 Speaking advisory...');
}
function speakResponse() {
  speakText(document.getElementById('aiResponseBody').innerText);
}

// ─── CLEAR ───────────────────────────────────────────
function clearAdvice() {
  document.getElementById('problemText').value = '';
  document.getElementById('aiResponse').classList.remove('visible');
  document.getElementById('imagePreview').style.display = 'none';
  imageBase64 = null;
}

// ─── API CALL HELPER ─────────────────────────────────
async function callClaude(systemPrompt, userMessage, imageData) {
  const msgs = [];
  if (imageData) {
    msgs.push({ role: 'user', content: [
      { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imageData } },
      { type: 'text', text: userMessage }
    ]});
  } else {
    msgs.push({ role: 'user', content: userMessage });
  }
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: msgs
    })
  });
  if (!resp.ok) throw new Error('API error ' + resp.status);
  const data = await resp.json();
  return data.content.map(c => c.text || '').join('');
}

function showLoading(elId) {
  const el = document.getElementById(elId);
  el.innerHTML = '<div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
}

// ─── MAIN ADVISORY ────────────────────────────────────
async function getAIAdvice() {
  const problem = document.getElementById('problemText').value.trim();
  const animal  = document.getElementById('animalType').value;
  const concern = document.getElementById('concernType').value;
  if (!problem) { showToast('⚠️ Please describe the problem first'); return; }

  const respEl = document.getElementById('aiResponse');
  const bodyEl = document.getElementById('aiResponseBody');
  respEl.classList.add('visible');
  showLoading('aiResponseBody');

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are GAU SAARTHI, an expert AI dairy advisory assistant for small Indian dairy farmers. You have deep knowledge of:
- ICAR guidelines for cattle and buffalo management
- Common livestock diseases (mastitis, FMD, BQ, HS, bloat, milk fever, etc.)
- Reproductive management and estrus detection
- NDDB breeding standards
- Affordable, locally available remedies and practices
Always structure your response clearly with:
1. 🔍 Possible Cause/Assessment
2. ✅ Immediate Actions (simple, actionable)
3. 🌿 Home/Preventive Care
4. ⚠️ When to Call Vet
5. 📅 Follow-up Reminder
Be empathetic, practical, and use simple language. ${langInstr}`;

  const imgNote = imageBase64 ? 'Also analyze the uploaded photo of the animal.' : '';
  const prompt = `Animal: ${animal}. Main concern: ${concern}. Farmer says: "${problem}". ${imgNote} Please provide detailed, actionable dairy advisory.`;

  try {
    const result = await callClaude(sys, prompt, imageBase64);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  } catch(e) {
    bodyEl.innerHTML = getFallbackAdvice(concern, animal, problem);
  }
}

// ─── HEALTH ANALYSIS ─────────────────────────────────
async function analyzeHealth() {
  const animal   = document.getElementById('healthAnimal').value;
  const milk     = document.getElementById('milkYield').value;
  const temp     = document.getElementById('bodyTemp').value;
  const bcs      = document.getElementById('bcs').value;
  const appetite = document.getElementById('appetite').value;
  const notes    = document.getElementById('healthNotes').value;
  const symptoms = Array.from(document.querySelectorAll('#symptomsGrid input:checked')).map(c => c.value);

  const respEl = document.getElementById('healthAIResponse');
  const bodyEl = document.getElementById('healthAIResponseBody');
  respEl.classList.add('visible');
  showLoading('healthAIResponseBody');

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are a veterinary advisory AI for GAU SAARTHI, an Indian dairy farmer support system. Analyze animal health data and provide ICAR-aligned guidance. Be specific, practical, and farmer-friendly. ${langInstr}`;
  const imgNote = healthImageBase64 ? 'The farmer has also uploaded a photo of the animal/affected area – analyze it.' : '';
  const prompt = `Health observation for: ${animal}
Milk yield: ${milk || 'not given'} L
Temperature: ${temp || 'not taken'} °F  
Body Condition Score: ${bcs}/5
Appetite: ${appetite}
Symptoms observed: ${symptoms.length ? symptoms.join(', ') : 'none noted'}
Additional notes: ${notes || 'none'}
${imgNote}

Provide:
1. 🔍 Health Status Assessment
2. 🚦 Risk Level (Low/Medium/High)
3. ✅ Recommended Actions
4. 🏥 Vet Consultation: Yes/No and Why
5. 📅 Monitoring Plan`;

  try {
    const result = await callClaude(sys, prompt, healthImageBase64);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
    showToast('✅ Health analysis complete');
  } catch(e) {
    bodyEl.innerHTML = 'Unable to connect to AI. Check your internet and try again.<br><br>⚠️ Based on entered data: Temperature and BCS suggest ' + (parseFloat(temp||0)>103 ? '<strong>fever – consult vet urgently.</strong>' : 'continue monitoring.');
  }
}

function logHealthEntry() {
  const animal = document.getElementById('healthAnimal').value;
  const milk   = document.getElementById('milkYield').value;
  const temp   = document.getElementById('bodyTemp').value;
  const date   = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  const logHtml = `<div class="log-entry"><div class="log-date">${date} – ${animal}</div>Milk: ${milk||'?'}L | Temp: ${temp||'?'}°F | Status: Logged ✅</div>`;
  document.getElementById('healthLog').insertAdjacentHTML('afterbegin', logHtml);
  showToast('💾 Health entry saved!');
}

// ─── MASTITIS CHECK ───────────────────────────────────
async function checkMastitis() {
  const animal  = document.getElementById('mastitisAnimal').value;
  const udder   = document.getElementById('udderCondition').value;
  const milk    = document.getElementById('milkAppearance').value;
  const days    = document.getElementById('daysCalving').value;

  const respEl = document.getElementById('mastitisResponse');
  const bodyEl = document.getElementById('mastitisBody');
  respEl.classList.add('visible');
  showLoading('mastitisBody');

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are a mastitis specialist AI for GAU SAARTHI. Assess mastitis risk for Indian dairy animals based on observable signs. Be specific about risk level, what it means financially (mention the ₹1,390 per lactation loss if relevant), and what to do. ${langInstr}`;
  const prompt = `Mastitis risk assessment:
Animal: ${animal}
Udder condition: ${udder}
Milk appearance: ${milk}
Days since calving: ${days || 'unknown'}

Provide:
1. 🔬 Risk Level: Subclinical / Clinical / High Risk
2. 💰 Estimated Financial Impact if untreated
3. 🧪 CMT Test Recommendation
4. ✅ Immediate Steps
5. 🏥 Vet Urgency Level`;

  try {
    const result = await callClaude(sys, prompt);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  } catch(e) {
    const isHigh = udder === 'very_hard' || milk === 'bloody' || milk === 'flakes';
    bodyEl.innerHTML = isHigh
      ? '🚨 <strong>HIGH RISK</strong> – Consult vet immediately. Clinical mastitis signs detected. Do not delay treatment.'
      : '⚠️ Moderate risk detected. Perform CMT test and monitor closely. Ensure clean milking practices.';
  }
}

// ─── BREEDING ADVICE ─────────────────────────────────
async function getBreedingAdvice() {
  const animal  = document.getElementById('breedAnimal').value;
  const lastHeat = document.getElementById('lastHeatDate').value;
  const lastCalv = document.getElementById('lastCalvingDate').value;

  const respEl = document.getElementById('breedingResponse');
  const bodyEl = document.getElementById('breedingBody');
  respEl.classList.add('visible');
  showLoading('breedingBody');

  const today = new Date();
  let daysSinceHeat = '?';
  if (lastHeat) {
    daysSinceHeat = Math.floor((today - new Date(lastHeat)) / 86400000);
  }

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are a reproductive management specialist AI for GAU SAARTHI, an Indian dairy farmer tool. Follow NDDB and ICAR guidelines. ${langInstr}`;
  const prompt = `Breeding advisory for: ${animal}
Last heat date: ${lastHeat || 'not recorded'} (${daysSinceHeat} days ago)
Last calving: ${lastCalv || 'not recorded'}
Today: ${today.toDateString()}

Provide:
1. 📅 Next Expected Heat Window
2. 🎯 Optimal Insemination Timing (12–18 hours after heat onset)
3. 🔍 Signs to Watch For
4. 💉 AI vs Natural Service Recommendation
5. ✅ Action Plan for This Week`;

  try {
    const result = await callClaude(sys, prompt);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  } catch(e) {
    const dsh = parseInt(daysSinceHeat);
    bodyEl.innerHTML = isNaN(dsh)
      ? '⚠️ Please enter the last heat date to get accurate predictions.'
      : dsh >= 18 && dsh <= 23
        ? '🔥 <strong>HEAT WINDOW NOW</strong> – Insemination recommended within next 6–12 hours for best conception rate.'
        : `📅 Next heat expected around Day 21. ${dsh < 21 ? (21-dsh) + ' days remaining.' : 'Overdue – monitor closely.'}`;
  }
}

function checkHeatSigns() {
  const checked = document.querySelectorAll('#heatSigns input:checked').length;
  if (checked >= 3) showToast('🔥 3+ heat signs detected! Prepare for insemination now.');
  else if (checked >= 1) showToast('⚠️ ' + checked + ' heat sign(s) observed. Continue monitoring.');
  else showToast('✅ No heat signs checked yet. Check again tomorrow.');
}

function updateCycleDisplay() {
  const lastHeat = document.getElementById('lastHeatDate').value;
  if (!lastHeat) return;
  const days = Math.floor((new Date() - new Date(lastHeat)) / 86400000) % 21 || 0;
  const pct = Math.min((days/21)*100, 100);
  document.getElementById('cycleDaysText').textContent = `Day ${days} / 21`;
  const fill = document.getElementById('cycleFill');
  fill.style.width = pct + '%';
  fill.className = 'cycle-fill ' + (days <= 10 ? 'green' : days <= 17 ? 'yellow' : 'red');
}

function logInsemination() {
  const animal = document.getElementById('aiAnimal').value;
  const date   = document.getElementById('aiDate').value;
  const type   = document.getElementById('aiType').value || 'Not specified';
  const by     = document.getElementById('aiBy').value;
  if (!date) { showToast('⚠️ Please enter insemination date'); return; }
  const pregCheck = new Date(new Date(date).getTime() + 30*86400000).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  const html = `<div class="log-entry"><div class="log-date">${new Date(date).toLocaleDateString('en-IN')} – ${animal}</div>${type} | ${by} | Pregnancy check due: ${pregCheck}</div>`;
  document.getElementById('aiLog').insertAdjacentHTML('afterbegin', html);
  showToast('💾 Insemination record saved!');
}

// ─── FEED ADVICE ─────────────────────────────────────
async function getFeedAdvice() {
  const animalType = document.getElementById('feedAnimalType').value;
  const weight     = document.getElementById('bodyWeight').value;
  const milk       = document.getElementById('feedMilkYield').value;
  const stage      = document.getElementById('lactStage').value;
  const feeds = [];
  if (document.getElementById('f_green').checked)   feeds.push('green fodder');
  if (document.getElementById('f_dry').checked)     feeds.push('dry straw');
  if (document.getElementById('f_cotton').checked)  feeds.push('cottonseed cake');
  if (document.getElementById('f_maize').checked)   feeds.push('maize silage');
  if (document.getElementById('f_grain').checked)   feeds.push('grain/concentrate mix');
  if (document.getElementById('f_mineral').checked) feeds.push('mineral mixture');

  const respEl = document.getElementById('feedAIResponse');
  const bodyEl = document.getElementById('feedAIBody');
  respEl.classList.add('visible');
  showLoading('feedAIBody');

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are a livestock nutrition expert aligned with ICAR (Indian Council of Agricultural Research) feeding norms. Give practical, affordable, locally-sourced feed recommendations for Indian dairy farmers. Provide specific quantities in kg. ${langInstr}`;
  const prompt = `Feed recommendation request:
Animal: ${animalType}
Body weight: ${weight || 'unknown'} kg
Daily milk yield: ${milk || 'unknown'} L
Lactation stage: ${stage}
Available feed resources: ${feeds.join(', ') || 'not specified'}

Provide ICAR-aligned daily feeding plan:
1. 🌿 Green Fodder (kg/day)
2. 🌾 Dry Fodder (kg/day)
3. 🌰 Concentrate Mix (kg/day) – quantity by milk yield
4. 💊 Mineral/Salt supplement
5. 💧 Water requirement
6. ⚠️ Nutritional Gaps to address
7. 💰 Estimated daily feed cost (₹)`;

  try {
    const result = await callClaude(sys, prompt);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  } catch(e) {
    const m = parseFloat(milk) || 8;
    bodyEl.innerHTML = `<strong>ICAR Feeding Guidelines (${animalType}):</strong><br><br>
🌿 Green Fodder: ${Math.round(m*2.5 + 10)} kg/day<br>
🌾 Dry Straw: 4–5 kg/day<br>
🌰 Concentrate: ${(1 + m/2.5).toFixed(1)} kg/day (1 kg per 2.5L milk above maintenance)<br>
💊 Mineral Mixture: 50g/day + Salt 30g/day<br>
💧 Water: 35–50 litres/day (more in summer)<br><br>
⚠️ Ensure clean water at all times. Divide feed into 2–3 meals.`;
  }
}

async function predictYield() {
  const breed  = document.getElementById('predBreed').value;
  const age    = document.getElementById('predAge').value;
  const parity = document.getElementById('predParity').value;
  const bcs    = document.getElementById('predBCS').value;

  const respEl = document.getElementById('yieldResponse');
  const bodyEl = document.getElementById('yieldBody');
  respEl.classList.add('visible');
  showLoading('yieldBody');

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are a milk yield prediction expert for Indian dairy breeds. Give realistic range estimates in litres per day and per lactation, with key factors. ${langInstr}`;
  const prompt = `Predict milk yield:
Breed: ${breed}
Age: ${age} years
Parity (lactation number): ${parity}
BCS: ${bcs}/5

Provide:
1. Expected daily milk yield range (L/day)
2. Expected lactation yield (305-day)
3. Peak yield estimate
4. Key factors affecting yield
5. Tips to improve yield`;

  try {
    const result = await callClaude(sys, prompt);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  } catch(e) {
    const yields = { 'HF Cross': [10,15], 'Jersey': [8,12], 'Sahiwal': [6,9], 'Murrah Buffalo': [8,12] };
    const range = yields[breed] || [7,11];
    bodyEl.innerHTML = `📊 <strong>Expected Yield: ${range[0]}–${range[1]} L/day</strong><br>Lactation (305d): ~${range[0]*250}–${range[1]*250} L<br>BCS ${bcs}: ${bcs=='3'?'Optimal condition ✅':bcs=='2'?'Improve body condition ⚠️':'Reduce energy density ⚠️'}`;
  }
}

async function getCarbonAdvice() {
  const herd   = document.getElementById('herdSize').value;
  const manure = document.getElementById('manureMethod').value;
  const milk   = document.getElementById('carbonMilk').value;

  const respEl = document.getElementById('carbonResponse');
  const bodyEl = document.getElementById('carbonBody');
  respEl.classList.add('visible');
  showLoading('carbonBody');

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are a sustainable dairy and climate advisor for GAU SAARTHI. Provide practical, low-cost carbon reduction guidance for small Indian dairy farmers aligned with national climate goals. Focus on biogas, manure management, and feeding efficiency.`;
  const prompt = `Low-carbon dairy assessment:
Herd size: ${herd || 'not given'} animals
Manure management: ${manure}
Average milk yield: ${milk || 'not given'} L/animal/day

Provide:
1. 🌍 Current Carbon Footprint Assessment (g CO2e/L milk)
2. 🌱 Top 3 Emission Reduction Actions
3. ♻️ Manure → Biogas potential (m³/day, energy value)
4. 💰 Financial benefits of each action
5. 🏆 Low-Carbon Dairy Score (1–10)`;

  try {
    const result = await callClaude(sys, prompt);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  } catch(e) {
    const h = parseInt(herd) || 3;
    bodyEl.innerHTML = `🌍 <strong>Carbon Assessment (${h} animals):</strong><br><br>
${manure === 'biogas' ? '✅ Biogas – excellent! Already reducing methane.' : manure === 'compost' ? '♻️ Composting – good practice.' : '⚠️ Switch to biogas or composting for major impact.'}<br><br>
🌱 Key Actions:<br>
1. Install biogas plant – saves ₹8,000–12,000/year in fuel<br>
2. Optimize feed – reduces enteric methane by 5–10%<br>
3. Improve breeding – higher-yielding animals = less emission per litre<br><br>
🏆 Carbon Score: ${manure === 'biogas' ? '8/10' : manure === 'compost' ? '6/10' : '4/10'}`;
  }
}

// ─── HERD FUNCTIONS ───────────────────────────────────
function showAddAnimalForm() {
  const f = document.getElementById('addAnimalForm');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('newDate').value = today;
}

function addAnimal() {
  const name    = document.getElementById('newName').value.trim();
  const species = document.getElementById('newSpecies').value;
  const breed   = document.getElementById('newBreed').value || 'Unknown';
  if (!name) { showToast('⚠️ Please enter animal name'); return; }
  const emoji = species === 'Cow' ? '🐄' : species === 'Buffalo' ? '🐃' : '🐮';
  const html = `<div class="animal-card" onclick="selectAnimal(this,'${name}')">
    <div class="animal-header"><div class="animal-name">${emoji} ${name}</div><span class="animal-badge badge-ok">✅ New</span></div>
    <div class="animal-meta">${breed} | ${species} | Just added</div>
  </div>`;
  document.getElementById('animalList').insertAdjacentHTML('beforeend', html);
  document.getElementById('addAnimalForm').style.display = 'none';
  showToast('✅ ' + name + ' added to your herd!');
  document.getElementById('newName').value = '';
}

function selectAnimal(el, name) {
  document.querySelectorAll('.animal-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedAnimalName = name;
  const detail = document.getElementById('animalDetail');
  document.getElementById('detailTitle').textContent = '📋 ' + name;
  document.getElementById('detailContent').innerHTML = `
    <div class="alert alert-info">Selected: <strong>${name}</strong>. Click "AI Full Health Summary" for a comprehensive analysis.</div>`;
  detail.style.display = 'block';
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function getAnimalSummary() {
  if (!selectedAnimalName) { showToast('⚠️ Select an animal first'); return; }
  const respEl = document.getElementById('animalSummaryResponse');
  const bodyEl = document.getElementById('animalSummaryBody');
  respEl.classList.add('visible');
  showLoading('animalSummaryBody');

  const langInstr = currentLang === 'hi' ? 'IMPORTANT: You must respond entirely in Hindi language.' : currentLang === 'pa' ? 'IMPORTANT: You must respond entirely in Punjabi (Gurmukhi script) language.' : 'Respond in English.';
  const sys = `You are GAU SAARTHI's AI veterinary assistant. Provide a comprehensive health, breeding, and nutrition summary for a dairy animal, with actionable recommendations. Be farmer-friendly and practical.`;
  const prompt = `Generate a complete health summary and action plan for: ${selectedAnimalName}
Include:
1. 🏥 Overall Health Status
2. 🥛 Milk Production Outlook
3. 🌱 Breeding/Reproductive Status  
4. 🌾 Nutrition Recommendations
5. 💉 Vaccination Reminders (FMD, HS, BQ schedule)
6. 📅 Next 30-Day Action Plan
7. ⚠️ Watch Points`;

  try {
    const result = await callClaude(sys, prompt);
    bodyEl.innerHTML = result.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  } catch(e) {
    bodyEl.innerHTML = `📋 <strong>Summary for ${selectedAnimalName}:</strong><br><br>
🏥 Health: Monitor daily for changes in appetite, milk, and behavior.<br>
💉 Vaccinations: FMD (6-monthly), HS+BQ (annually before monsoon).<br>
🌾 Nutrition: Ensure ICAR-recommended balanced diet.<br>
📅 Next steps: Record milk daily, check for heat signs, deworm quarterly.`;
  }
}

// ─── FALLBACK ADVICE ─────────────────────────────────
function getFallbackAdvice(concern, animal, problem) {
  const fallbacks = {
    mastitis: `🔍 <strong>Possible Cause:</strong> Mastitis (udder infection) – most common in lactating cows.<br><br>✅ <strong>Immediate Actions:</strong><br>• Check all 4 udder quarters for hardness, heat, swelling<br>• Perform CMT (California Mastitis Test) if available<br>• Do not discard milk without vet advice<br>• Improve milking hygiene – clean hands, disinfect teat dips<br><br>🌿 <strong>Home Care:</strong> Warm compress on swollen quarter 2–3 times daily. Ensure clean dry bedding.<br><br>⚠️ <strong>Call Vet If:</strong> Temperature above 103°F, blood in milk, cow refusing feed, severe swelling.<br><br>📅 <strong>Reminder:</strong> Recheck in 24 hours. Log daily milk yield.`,
    milk: `🔍 <strong>Possible Cause:</strong> Nutritional deficiency, stress, health issue, or late lactation stage.<br><br>✅ <strong>Immediate Actions:</strong><br>• Increase concentrate feed by 500g/day<br>• Add mineral mixture (50g/day)<br>• Ensure 35–50L clean water daily<br>• Check for mastitis signs<br><br>🌿 <strong>Home Care:</strong> Add jaggery (200g) and rock salt to feed. Improve green fodder access.<br><br>⚠️ <strong>Call Vet If:</strong> Drop exceeds 30%, or fever/lethargy present.<br><br>📅 <strong>Reminder:</strong> Monitor milk for 3 days. Record daily.`,
    heat: `🔍 <strong>Possible Cause:</strong> Animal may be in or approaching estrus (heat).<br><br>✅ <strong>Immediate Actions:</strong><br>• Observe for 30 min morning and evening<br>• Note mounting, restlessness, clear discharge<br>• Contact AI center / vet 12–18 hours after heat onset<br><br>🌿 <strong>Breeding Tip:</strong> Best time for insemination is 12–18 hours after heat onset. Don't delay!<br><br>⚠️ <strong>Contact Vet If:</strong> Signs unclear, repeated heat with no conception, discharge abnormal.<br><br>📅 <strong>Reminder:</strong> Record date and signs in your log.`,
    general: `🔍 <strong>Assessment:</strong> Based on your description, general monitoring is recommended.<br><br>✅ <strong>Immediate Actions:</strong><br>• Check temperature (normal: 101–102.5°F)<br>• Observe appetite and water intake<br>• Check for any visible wounds or swelling<br><br>🌿 <strong>Preventive Care:</strong> Ensure clean water, balanced feeding, and shelter from extreme weather.<br><br>⚠️ <strong>Call Vet If:</strong> Condition worsens, temperature above 104°F, animal stops eating for 24+ hours.<br><br>📅 <strong>Reminder:</strong> Observe animal twice daily for next 3 days.`
  };
  return fallbacks[concern] || fallbacks.general;
}

// ─── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('obsDate').value = today;

  // Set a sample last heat date for demo
  const sampleHeat = new Date(Date.now() - 14*86400000).toISOString().split('T')[0];
  document.getElementById('lastHeatDate').value = sampleHeat;
  updateCycleDisplay();
  setLang('en');
});
</script>
</body>
</html>