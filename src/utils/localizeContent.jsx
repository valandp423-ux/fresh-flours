import React, { Children, cloneElement, isValidElement } from 'react';
import { useCart } from '../context/CartContext';

const UI_TRANSLATIONS = {
  Home: ['હોમ', 'होम'],
  Shop: ['દુકાન', 'दुकान'],
  'Our Story': ['અમારી વાર્તા', 'हमारी कहानी'],
  'Milling Process': ['દળવાની પ્રક્રિયા', 'पिसाई प्रक्रिया'],
  Delivery: ['ડિલિવરી', 'डिलीवरी'],
  FAQs: ['વારંવાર પૂછાતા પ્રશ્નો', 'अक्सर पूछे जाने वाले प्रश्न'],
  'Delivery Cost': ['ડિલિવરી ખર્ચ', 'डिलीवरी लागत'],
  'Our Mill Story': ['અમારી ઘંટીની વાર્તા', 'हमारी चक्की की कहानी'],
  'Recipes & Guides': ['વાનગીઓ અને માર્ગદર્શિકા', 'रेसिपी और मार्गदर्शिका'],
  'Questions & Answers': ['પ્રશ્નો અને જવાબો', 'प्रश्न और उत्तर'],
  Contact: ['સંપર્ક', 'संपर्क'],
  Basket: ['ટોપલી', 'कार्ट'],
  'Search flours...': ['લોટ શોધો...', 'आटा खोजें...'],
  'Search flours and grains': ['લોટ અને અનાજ શોધો', 'आटा और अनाज खोजें'],
  'My Orders': ['મારા ઓર્ડર', 'मेरे ऑर्डर'],
  'Stoneground Milled Daily in USA': ['યુ.એસ.એ.માં દરરોજ પથ્થરની ઘંટીમાં દળેલું', 'अमेरिका में रोज़ ताज़ा पिसा'],
  'Shop Fresh Flours & Grains': ['તાજા લોટ અને અનાજ ખરીદો', 'ताज़ा आटा और अनाज खरीदें'],
  'All Products': ['બધા ઉત્પાદનો', 'सभी उत्पाद'],
  'Fresh Flours': ['તાજા લોટ', 'ताज़ा आटा'],
  'Whole Grains': ['આખા અનાજ', 'साबुत अनाज'],
  'Crispy Snacks': ['કરકરા નાસ્તા', 'कुरकुरे नाश्ते'],
  'Puffed Mamra': ['મમરા', 'ममरा'],
  'Search by flour name, Gujarati or English...': ['લોટનું નામ ગુજરાતી અથવા અંગ્રેજીમાં શોધો...', 'आटे का नाम गुजराती या अंग्रेज़ी में खोजें...'],
  'What delivery costs': ['ડિલિવરીનો ખર્ચ', 'डिलीवरी का खर्च'],
  "Delivery isn't free, because grain is heavy. Enter your ZIP code to see an estimate based on your basket weight.": ['અનાજ ભારે હોવાથી ડિલિવરી મફત નથી. તમારા ટોપલાના વજન પ્રમાણે અંદાજ જોવા ZIP કોડ દાખલ કરો.', 'अनाज भारी होता है, इसलिए डिलीवरी मुफ़्त नहीं है। अपनी कार्ट के वज़न के अनुसार अनुमान देखने के लिए ZIP कोड दर्ज करें।'],
  'Your basket weighs': ['તમારી ટોપલીનું વજન', 'आपकी कार्ट का वज़न'],
  'Your basket': ['તમારી ટોપલી', 'आपकी कार्ट'],
  'Your ZIP code': ['તમારો ZIP કોડ', 'आपका ZIP कोड'],
  'Work out my delivery cost': ['મારો ડિલિવરી ખર્ચ ગણો', 'मेरी डिलीवरी लागत जानें'],
  'Finding your delivery estimate...': ['તમારા ડિલિવરી ખર્ચનો અંદાજ મેળવી રહ્યા છીએ...', 'आपकी डिलीवरी का अनुमान प्राप्त हो रहा है...'],
  'Enter a valid 5-digit U.S. ZIP code.': ['યોગ્ય 5 અંકનો અમેરિકી ZIP કોડ દાખલ કરો.', 'सही 5 अंकों का अमेरिकी ZIP कोड दर्ज करें।'],
  'Add items to your basket to estimate delivery.': ['ડિલિવરીનો અંદાજ મેળવવા ટોપલીમાં વસ્તુઓ ઉમેરો.', 'डिलीवरी का अनुमान पाने के लिए कार्ट में सामान जोड़ें।'],
  'ZIP code not found. Check the number and try again.': ['ZIP કોડ મળ્યો નથી. કોડ તપાસીને ફરી પ્રયાસ કરો.', 'ZIP कोड नहीं मिला। नंबर जाँचकर फिर कोशिश करें।'],
  'ZIP lookup is unavailable right now. Please try again.': ['હાલ ZIP કોડ તપાસી શકાતો નથી. ફરી પ્રયાસ કરો.', 'अभी ZIP कोड की जाँच उपलब्ध नहीं है। कृपया फिर कोशिश करें।'],
  'We could not identify a state for that ZIP code. Check the number and try again.': ['આ ZIP કોડ માટે રાજ્ય શોધી શકાયું નથી. કોડ તપાસીને ફરી પ્રયાસ કરો.', 'इस ZIP कोड के लिए राज्य नहीं मिला। नंबर जाँचकर फिर कोशिश करें।'],
  'We could not calculate delivery for that ZIP code. Please try again.': ['આ ZIP કોડ માટે ડિલિવરી ગણતરી થઈ શકી નથી. ફરી પ્રયાસ કરો.', 'इस ZIP कोड के लिए डिलीवरी की गणना नहीं हो सकी। कृपया फिर कोशिश करें।'],
  'One box holds up to 40 lb. A heavier order is split into more boxes, and each box has its own delivery charge.': ['એક બોક્સમાં 40 પાઉન્ડ સુધી સામાન આવે છે. વધુ વજનના ઓર્ડરને વધારાના બોક્સમાં વહેંચવામાં આવે છે અને દરેક બોક્સનો ડિલિવરી ચાર્જ અલગ હોય છે.', 'एक बॉक्स में 40 पाउंड तक सामान आता है। इससे भारी ऑर्डर को अतिरिक्त बॉक्स में बाँटा जाता है और हर बॉक्स का डिलीवरी शुल्क अलग होता है।'],
  'Picking up at our store is free. Choose “Pickup in Store” at checkout.': ['અમારા સ્ટોરેથી પિકઅપ મફત છે. ચેકઆઉટ વખતે “સ્ટોરમાંથી પિકઅપ” પસંદ કરો.', 'हमारे स्टोर से पिकअप मुफ़्त है। चेकआउट पर “स्टोर से पिकअप” चुनें।'],
  'Rates shown are estimates based on the ZIP-code destination and current state rate. Final delivery cost is confirmed at checkout.': ['દર્શાવેલા દર ZIP કોડના ગંતવ્ય અને હાલના રાજ્યના દર પ્રમાણેના અંદાજ છે. અંતિમ ડિલિવરી ખર્ચની પુષ્ટિ ચેકઆઉટ વખતે થશે.', 'दिखाई गई दरें ZIP कोड के गंतव्य और मौजूदा राज्य दर पर आधारित अनुमान हैं। अंतिम डिलीवरी लागत की पुष्टि चेकआउट पर होगी।'],
  'Our Milling Process': ['અમારી લોટ દળવાની પ્રક્રિયા', 'हमारी आटा पिसाई प्रक्रिया'],
  'How We Mill': ['અમે લોટ કેવી રીતે દળીએ છીએ', 'हम आटा कैसे पीसते हैं'],
  'From whole grain to freshly milled flour, here is how we prepare your order at The Fresh Flours.': ['આખા અનાજથી તાજા દળેલા લોટ સુધી, The Fresh Flours ખાતે અમે તમારો ઓર્ડર આ રીતે તૈયાર કરીએ છીએ.', 'साबुत अनाज से ताज़ा पिसे आटे तक, The Fresh Flours में हम आपका ऑर्डर इस तरह तैयार करते हैं।'],
  '1. Start with whole grain': ['1. આખા અનાજથી શરૂઆત', '1. साबुत अनाज से शुरुआत'],
  'We mill whole grains into flour in small, fresh batches rather than keeping piles of pre-ground flour in storage.': ['અગાઉથી દળેલો લોટ સંગ્રહમાં રાખવાને બદલે, અમે આખા અનાજને નાના તાજા જથ્થામાં દળીએ છીએ.', 'पहले से पिसा आटा जमा रखने के बजाय, हम साबुत अनाज को छोटे ताज़ा बैच में पीसते हैं।'],
  '2. Stone-mill to order': ['2. ઓર્ડર મુજબ પથ્થરની ઘંટીમાં દળવું', '2. ऑर्डर पर पत्थर की चक्की में पीसना'],
  'Our stone mill grinds the grain slowly into the traditional texture used for each flour.': ['અમારી પથ્થરની ઘંટી દરેક લોટ માટે જરૂરી પરંપરાગત કરકરાશમાં અનાજને ધીમે દળે છે.', 'हमारी पत्थर की चक्की हर आटे के पारंपरिक बनावट के अनुसार अनाज को धीरे पीसती है।'],
  '3. Pack it fresh': ['3. તાજું પેક કરવું', '3. ताज़ा पैक करना'],
  'Freshly milled flour is packed for your order, ready for delivery or free store pickup.': ['તાજા દળેલા લોટને તમારા ઓર્ડર માટે પેક કરવામાં આવે છે, જે ડિલિવરી અથવા મફત સ્ટોર પિકઅપ માટે તૈયાર છે.', 'ताज़ा पिसा आटा आपके ऑर्डर के लिए पैक किया जाता है और डिलीवरी या मुफ़्त स्टोर पिकअप के लिए तैयार रहता है।'],
  Fulfillment: ['ડિલિવરીનો પ્રકાર', 'डिलीवरी का तरीका'],
  'All Delivery Types': ['બધા ડિલિવરી પ્રકાર', 'सभी डिलीवरी प्रकार'],
  'Shippable Nationwide': ['આખા દેશમાં મોકલી શકાય', 'पूरे देश में भेजा जा सकता है'],
  'Store Pickup Only': ['ફક્ત દુકાનેથી પિકઅપ', 'केवल स्टोर से पिकअप'],
  'Featured / Mill Queue': ['વિશેષ / મિલિંગ યાદી', 'विशेष / मिलिंग सूची'],
  'Price: Low to High': ['કિંમત: ઓછીથી વધુ', 'कीमत: कम से ज़्यादा'],
  'Price: High to Low': ['કિંમત: વધુથી ઓછી', 'कीमत: ज़्यादा से कम'],
  'Product Name (A-Z)': ['ઉત્પાદનનું નામ (A-Z)', 'उत्पाद का नाम (A-Z)'],
  'Reset all filters': ['બધા ફિલ્ટર દૂર કરો', 'सभी फ़िल्टर हटाएँ'],
  'Showing': ['દર્શાવેલ', 'दिखाए जा रहे'],
  products: ['ઉત્પાદનો', 'उत्पाद'],
  'No products found': ['કોઈ ઉત્પાદન મળ્યું નથી', 'कोई उत्पाद नहीं मिला'],
  'Shop by Category': ['શ્રેણી પ્રમાણે ખરીદો', 'श्रेणी के अनुसार खरीदें'],
  'Browse Products': ['ઉત્પાદનો જુઓ', 'उत्पाद देखें'],
  'Shop Fresh Flours': ['તાજા લોટ ખરીદો', 'ताज़ा आटा खरीदें'],
  'Work Out Delivery Cost': ['ડિલિવરી ખર્ચ ગણો', 'डिलीवरी लागत जानें'],
  'Ground today, packed today': ['આજે દળેલું, આજે પેક કરેલું', 'आज पिसा, आज पैक किया'],
  'Up to 40 lb per heavy box': ['દરેક બોક્સમાં 40 પાઉન્ડ સુધી', 'हर बॉक्स में 40 पाउंड तक'],
  'Free Store Pickup': ['દુકાનેથી મફત પિકઅપ', 'स्टोर से मुफ़्त पिकअप'],
  'Tennessee mill location': ['ટેનેસી મિલનું સ્થળ', 'टेनेसी मिल का स्थान'],
  'View All 24 Products': ['બધા ઉત્પાદનો જુઓ', 'सभी उत्पाद देखें'],
  'View All Recipes': ['બધી વાનગીઓ જુઓ', 'सभी रेसिपी देखें'],
  'From our mill to your kitchen': ['અમારી મિલથી તમારા રસોડા સુધી', 'हमारी चक्की से आपकी रसोई तक'],
  'Delivery and Pickup': ['ડિલિવરી અને પિકઅપ', 'डिलीवरी और पिकअप'],
  'Delivery Cost Estimates': ['ડિલિવરી ખર્ચનો અંદાજ', 'डिलीवरी लागत का अनुमान'],
  'The 40 lb Box Rule': ['40 પાઉન્ડના બોક્સનો નિયમ', '40 पाउंड के बॉक्स का नियम'],
  'Estimated Delivery Rates': ['અંદાજિત ડિલિવરી દર', 'अनुमानित डिलीवरी दरें'],
  'Estimated Delivery Rate by State (Per 40 lb Box)': ['રાજ્ય પ્રમાણે અંદાજિત ડિલિવરી દર (40 પાઉન્ડના બોક્સ દીઠ)', 'राज्य के अनुसार अनुमानित डिलीवरी दर (40 पाउंड के बॉक्स पर)'],
  'Estimate Your Delivery Cost': ['તમારા ડિલિવરી ખર્ચનો અંદાજ મેળવો', 'अपनी डिलीवरी लागत का अनुमान लगाएँ'],
  'Order Weight:': ['ઓર્ડરનું વજન:', 'ऑर्डर का वज़न:'],
  'Destination State:': ['ગંતવ્ય રાજ્ય:', 'डिलीवरी का राज्य:'],
  'Required Boxes': ['જરૂરી બોક્સ', 'ज़रूरी बॉक्स'],
  'Box Packing': ['બોક્સમાં પેકિંગ', 'बॉक्स में पैकिंग'],
  'Estimated Delivery': ['અંદાજિત ડિલિવરી', 'अनुमानित डिलीवरी'],
  'Pickup at Store': ['દુકાનેથી પિકઅપ', 'स्टोर से पिकअप'],
  'Shop Flours': ['લોટ ખરીદો', 'आटा खरीदें'],
  'Need a Bulk or Pallet Delivery Quote?': ['મોટા અથવા પેલેટ ઓર્ડર માટે ડિલિવરીનો ભાવ જોઈએ?', 'थोक या पैलेट डिलीवरी का भाव चाहिए?'],
  'Call +1 (423) 664-3353': ['ફોન કરો: +1 (423) 664-3353', 'कॉल करें: +1 (423) 664-3353'],
  'Your basket is empty': ['તમારી ટોપલી ખાલી છે', 'आपकी कार्ट खाली है'],
  'Your basket contains items marked "Pickup Only"': ['તમારી ટોપલીમાં ફક્ત પિકઅપ માટેની વસ્તુઓ છે', 'आपकी कार्ट में केवल पिकअप वाली चीज़ें हैं'],
  'Items Subtotal': ['વસ્તુઓનો કુલ સરવાળો', 'सामान का कुल'],
  'Delivery Fee': ['ડિલિવરી ફી', 'डिलीवरी शुल्क'],
  'Estimated Grocery Tax': ['અંદાજિત કર', 'अनुमानित कर'],
  'Total (Pre-Payment Fee)': ['કુલ (ચુકવણી ફી પહેલાં)', 'कुल (भुगतान शुल्क से पहले)'],
  'Proceed to Checkout': ['ચેકઆઉટ પર આગળ વધો', 'चेकआउट पर जाएँ'],
  'Checkout': ['ચેકઆઉટ', 'चेकआउट'],
  'No Items in Checkout': ['ચેકઆઉટમાં કોઈ વસ્તુ નથી', 'चेकआउट में कोई सामान नहीं'],
  'Explore Fresh Flours': ['તાજા લોટ જુઓ', 'ताज़ा आटा देखें'],
  'Customer Details': ['ગ્રાહકની વિગતો', 'ग्राहक का विवरण'],
  'Fulfillment & Address': ['ડિલિવરી અને સરનામું', 'डिलीवरी और पता'],
  'Payment & Review': ['ચુકવણી અને સમીક્ષા', 'भुगतान और समीक्षा'],
  'Contact Information': ['સંપર્ક માહિતી', 'संपर्क जानकारी'],
  'Email Address *': ['ઈમેલ સરનામું *', 'ईमेल पता *'],
  'Full Name *': ['પૂરું નામ *', 'पूरा नाम *'],
  'Mobile Phone Number *': ['મોબાઇલ નંબર *', 'मोबाइल फ़ोन नंबर *'],
  'Continue to Fulfillment': ['ડિલિવરી પસંદ કરવા આગળ વધો', 'डिलीवरी चुनने के लिए आगे बढ़ें'],
  'Choose Delivery Method': ['ડિલિવરીનો પ્રકાર પસંદ કરો', 'डिलीवरी का तरीका चुनें'],
  'Carrier Box Delivery': ['કુરિયર બોક્સ ડિલિવરી', 'कूरियर बॉक्स डिलीवरी'],
  'Free Store Pickup ($0)': ['દુકાનેથી મફત પિકઅપ ($0)', 'स्टोर से मुफ़्त पिकअप ($0)'],
  'Continue to Payment': ['ચુકવણી માટે આગળ વધો', 'भुगतान के लिए आगे बढ़ें'],
  'Select Payment Method': ['ચુકવણીનો પ્રકાર પસંદ કરો', 'भुगतान का तरीका चुनें'],
  'Print Invoice': ['ઇન્વૉઇસ છાપો', 'चालान प्रिंट करें'],
  'Track My Orders': ['મારા ઓર્ડર ટ્રૅક કરો', 'मेरे ऑर्डर ट्रैक करें'],
  'Popular Flours': ['લોકપ્રિય લોટ', 'लोकप्रिय आटा'],
  'Customer Care': ['ગ્રાહક સેવા', 'ग्राहक सेवा'],
  'Delivery Cost & Box Rules': ['ડિલિવરી ખર્ચ અને બોક્સના નિયમો', 'डिलीवरी लागत और बॉक्स के नियम'],
  'Questions & Answers (FAQ)': ['પ્રશ્નો અને જવાબો (FAQ)', 'प्रश्न और उत्तर (FAQ)'],
  'Our Milling Philosophy': ['અમારી દળવાની રીત', 'हमारी पिसाई की जानकारी'],
  'Traditional Recipes & Guides': ['પરંપરાગત વાનગીઓ અને માર્ગદર્શિકા', 'पारंपरिक रेसिपी और मार्गदर्शिका'],
  'Track Order / Repeat Order': ['ઓર્ડર ટ્રૅક કરો / ફરીથી ઓર્ડર કરો', 'ऑर्डर ट्रैक करें / दोबारा ऑर्डर करें'],
  'Contact & Bulk Inquiries': ['સંપર્ક અને મોટા ઓર્ડરની પૂછપરછ', 'संपर्क और थोक ऑर्डर पूछताछ'],
  'Shipping Policy': ['શિપિંગ નીતિ', 'शिपिंग नीति'],
  'Return Policy': ['વળતર નીતિ', 'वापसी नीति'],
  'Privacy Policy': ['ગોપનીયતા નીતિ', 'गोपनीयता नीति'],
  'Terms of Service': ['સેવાની શરતો', 'सेवा की शर्तें'],
  'Quick View': ['ઝડપી જુઓ', 'झटपट देखें'],
  'Add to basket': ['ટોપલીમાં ઉમેરો', 'कार्ट में डालें'],
  'In basket': ['ટોપલીમાં છે', 'कार्ट में है'],
  'Out of stock': ['સ્ટોકમાં નથી', 'स्टॉक में नहीं'],
  'Coming Soon': ['ટૂંક સમયમાં', 'जल्द आ रहा है'],
  'Pickup Only': ['ફક્ત પિકઅપ', 'केवल पिकअप'],
  'Close search': ['શોધ બંધ કરો', 'खोज बंद करें'],
  'Close basket': ['ટોપલી બંધ કરો', 'कार्ट बंद करें'],
  'Close details': ['વિગતો બંધ કરો', 'जानकारी बंद करें'],
  'Close recipe': ['વાનગી બંધ કરો', 'रेसिपी बंद करें'],
  'Search freshly milled flours, grains, or recipes...': ['તાજા લોટ, અનાજ અથવા વાનગીઓ શોધો...', 'ताज़ा आटा, अनाज या रेसिपी खोजें...'],
  'Try searching for Bajri, Juwar, Chapati, Bhakhari, or Besan.': ['બાજરી, જુવાર, ચપાતી, ભાખરી અથવા બેસન શોધો.', 'बाजरा, ज्वार, चपाती, भाखरी या बेसन खोजें।'],
  'Flour As It Was Meant To Taste.': ['લોટનો અસલ સ્વાદ માણો.', 'आटे का असली स्वाद चखें।'],
  'Milled Fresh Daily': ['દરરોજ તાજું દળેલું', 'रोज़ ताज़ा पिसा'],
  'in the USA.': ['અમેરિકામાં.', 'अमेरिका में।'],
  'Milled On Order': ['ઓર્ડર મળતાં જ દળેલું', 'ऑर्डर पर ताज़ा पिसा'],
  '0 Preservatives': ['કોઈ પ્રિઝર્વેટિવ્સ નહીં', 'कोई प्रिज़र्वेटिव नहीं'],
  '40 lb Inspected Boxes': ['40 પાઉન્ડના તપાસેલા બોક્સ', '40 पाउंड के जाँचे हुए बॉक्स'],
  'Zelle & Card Safe': ['Zelle અને કાર્ડથી સુરક્ષિત ચુકવણી', 'Zelle और कार्ड से सुरक्षित भुगतान'],
  'Call Us Directly': ['અમને સીધો ફોન કરો', 'हमें सीधे कॉल करें'],
  'Exact Freight Rates': ['ડિલિવરીના દર', 'डिलीवरी दरें'],
  'What Delivery Actually Costs': ['ડિલિવરીનો વાસ્તવિક ખર્ચ', 'डिलीवरी की वास्तविक लागत'],
  'Traditional Indian Kitchen Guides': ['પરંપરાગત ભારતીય રસોઈ માર્ગદર્શિકા', 'पारंपरिक भारतीय रसोई मार्गदर्शिका'],
  'Recipes & Heritage Flour Guides': ['વાનગીઓ અને પરંપરાગત લોટની માર્ગદર્શિકા', 'रेसिपी और पारंपरिक आटे की मार्गदर्शिका'],
  'From Our Mill to Your Hearth': ['અમારી મિલથી તમારા રસોડા સુધી', 'हमारी चक्की से आपकी रसोई तक'],
  'Puffed Softness, Crispy Crumb, and Fragrant Stone Mill Flavors': ['ફુલેલી નરમાઈ, કરકરો સ્વાદ અને પથ્થરની ઘંટીમાં દળેલા લોટની સુગંધ', 'फूली नरमी, कुरकुरापन और पत्थर की चक्की के आटे की खुशबू'],
  'Add Flour': ['લોટ ઉમેરો', 'आटा जोड़ें'],
  'Review Your Items': ['તમારી વસ્તુઓ તપાસો', 'अपने सामान की समीक्षा करें'],
  'Your Shopping Basket': ['તમારી ખરીદીની ટોપલી', 'आपकी खरीदारी की कार्ट'],
  Product: ['ઉત્પાદન', 'उत्पाद'],
  Subtotal: ['કુલ સરવાળો', 'उप-योग'],
  Remove: ['દૂર કરો', 'हटाएँ'],
  'Ship To Door': ['ઘરે મોકલો', 'घर पर भेजें'],
  'Ship to Door': ['ઘરે મોકલો', 'घर पर भेजें'],
  'Store Pickup ($0)': ['દુકાનેથી પિકઅપ ($0)', 'स्टोर से पिकअप ($0)'],
  'Deliver to State:': ['રાજ્યમાં ડિલિવરી:', 'राज्य में डिलीवरी:'],
  'Estimated Total': ['અંદાજિત કુલ', 'अनुमानित कुल'],
  'Decrease quantity': ['જથ્થો ઘટાડો', 'मात्रा घटाएँ'],
  'Increase quantity': ['જથ્થો વધારો', 'मात्रा बढ़ाएँ'],
  'Enter a valid email address, such as name@example.com.': ['યોગ્ય ઈમેલ સરનામું લખો, જેમ કે name@example.com.', 'सही ईमेल पता दर्ज करें, जैसे name@example.com।'],
  'Enter your full name.': ['તમારું પૂરું નામ લખો.', 'अपना पूरा नाम दर्ज करें।'],
  'Enter a valid US phone number with area code, such as (423) 664-3353.': ['એરિયા કોડ સાથે યોગ્ય અમેરિકી ફોન નંબર લખો, જેમ કે (423) 664-3353.', 'एरिया कोड सहित सही अमेरिकी फ़ोन नंबर दर्ज करें, जैसे (423) 664-3353।'],
  'Please correct the highlighted contact details.': ['હાઇલાઇટ કરેલી સંપર્ક વિગતો સુધારો.', 'हाइलाइट की गई संपर्क जानकारी ठीक करें।'],
  'Please add freshly stoneground flours or whole grains to your basket first.': ['પહેલાં તમારી ટોપલીમાં તાજો દળેલો લોટ અથવા આખું અનાજ ઉમેરો.', 'पहले अपनी कार्ट में ताज़ा पिसा आटा या साबुत अनाज जोड़ें।'],
  'Your Basket is Empty': ['તમારી ટોપલી ખાલી છે', 'आपकी कार्ट खाली है'],
  'Nothing has been added to your basket yet. Explore our stoneground pearl millet, sorghum, chapati, bhakhari, and whole grain varieties.': ['તમારી ટોપલીમાં હજી કંઈ ઉમેર્યું નથી. બાજરી, જુવાર, ચપાતી, ભાખરી અને આખા અનાજના વિકલ્પો જુઓ.', 'आपकी कार्ट में अभी कुछ नहीं है। बाजरा, ज्वार, चपाती, भाखरी और साबुत अनाज देखें।'],
  'Your order receipt and updates will be sent to this email and phone.': ['તમારી ઓર્ડરની રસીદ અને અપડેટ આ ઈમેલ અને ફોન પર મોકલવામાં આવશે.', 'आपकी ऑर्डर रसीद और अपडेट इस ईमेल और फ़ोन पर भेजे जाएँगे।'],
  'Needed for delivery updates or store pickup coordination.': ['ડિલિવરી અપડેટ અથવા સ્ટોર પિકઅપ માટે જરૂરી.', 'डिलीवरी अपडेट या स्टोर पिकअप के लिए ज़रूरी।'],
  'Edit Contact': ['સંપર્ક માહિતી બદલો', 'संपर्क जानकारी बदलें'],
  'Edit Delivery': ['ડિલિવરી માહિતી બદલો', 'डिलीवरी जानकारी बदलें'],
  Back: ['પાછળ', 'वापस'],
  'Zelle (0% Fee — Recommended)': ['Zelle (0% ફી — ભલામણ કરેલ)', 'Zelle (0% शुल्क — सुझाया गया)'],
  'Zero Surcharge': ['કોઈ વધારાનો ચાર્જ નહીં', 'कोई अतिरिक्त शुल्क नहीं'],
  'Print Order Invoice': ['ઓર્ડરની રસીદ છાપો', 'ऑर्डर की रसीद प्रिंट करें'],
  'Order ID': ['ઓર્ડર નંબર', 'ऑर्डर नंबर'],
  'Track Your Fresh Flour Order': ['તમારા લોટના ઓર્ડરની સ્થિતિ જુઓ', 'अपने आटे के ऑर्डर की स्थिति देखें'],
  'Recent Orders': ['તાજેતરના ઓર્ડર', 'हाल के ऑर्डर'],
  'No past orders found on this device': ['આ ઉપકરણ પર અગાઉના ઓર્ડર મળ્યા નથી', 'इस डिवाइस पर पुराने ऑर्डर नहीं मिले'],
  'Track Order': ['ઓર્ડર ટ્રૅક કરો', 'ऑर्डर ट्रैक करें'],
  'Reorder All': ['બધું ફરીથી ઓર્ડર કરો', 'सभी सामान दोबारा ऑर्डर करें'],
  Customer: ['ગ્રાહક', 'ग्राहक'],
  Payment: ['ચુકવણી', 'भुगतान'],
  'General Flour & Order Question': ['લોટ અને ઓર્ડર વિશે સામાન્ય પ્રશ્ન', 'आटे और ऑर्डर के बारे में सामान्य प्रश्न'],
  'Wholesale / Pallet / Temple Order': ['થોક / પેલેટ / મંદિરનો ઓર્ડર', 'थोक / पैलेट / मंदिर का ऑर्डर'],
  'Store Pickup Coordination': ['સ્ટોર પિકઅપની વ્યવસ્થા', 'स्टोर पिकअप की व्यवस्था'],
  'Custom Coarseness / Grain Request': ['લોટની કરકરાશ / અનાજ માટે વિનંતી', 'आटे की मोटाई / अनाज का अनुरोध'],
  'Send Message to Mill': ['મિલને સંદેશ મોકલો', 'चक्की को संदेश भेजें'],
  'Explore The Shop': ['દુકાન જુઓ', 'दुकान देखें'],
  'Explore The Flours': ['લોટ જુઓ', 'आटा देखें'],
  'View Delivery Costs': ['ડિલિવરી ખર્ચ જુઓ', 'डिलीवरी लागत देखें'],
  'How Delivery Works': ['ડિલિવરી કેવી રીતે થાય છે', 'डिलीवरी कैसे होती है'],
  'Delivery is never "free" in real life — because grain is heavy.': ['અનાજ ભારે હોવાથી તેની ડિલિવરીનો ખર્ચ લાગે છે.', 'अनाज भारी होता है, इसलिए उसकी डिलीवरी का खर्च लगता है।'],
  'Safe store pickup is available in Tennessee.': ['ટેનેસીમાં સ્ટોર પિકઅપ ઉપલબ્ધ છે.', 'टेनेसी में स्टोर पिकअप उपलब्ध है।'],
  'Delivery depends on your destination and the weight of your order. Use the estimator below to see the current estimate. Each box holds up to 40 lb, and pickup at our Tennessee mill is free.': ['ડિલિવરી તમારા ગંતવ્ય અને ઓર્ડરના વજન પર આધારિત છે. હાલનો અંદાજ જોવા નીચેના ગણતરી સાધનનો ઉપયોગ કરો. દરેક બોક્સમાં 40 પાઉન્ડ સુધી સામાન આવે છે અને ટેનેસીની અમારી મિલેથી પિકઅપ મફત છે.', 'डिलीवरी आपके गंतव्य और ऑर्डर के वज़न पर निर्भर करती है। मौजूदा अनुमान देखने के लिए नीचे दिए गए कैलकुलेटर का उपयोग करें। हर बॉक्स में 40 पाउंड तक सामान आता है और टेनेसी की हमारी चक्की से पिकअप मुफ़्त है।'],
  'One standard heavy-duty box holds up to 40 lb of product. A heavier order is cleanly split into additional boxes, each carrying its own carrier shipping fee.': ['એક મજબૂત સ્ટાન્ડર્ડ બોક્સમાં 40 પાઉન્ડ સુધી સામાન આવે છે. વધુ વજનના ઓર્ડરને વધારાના બોક્સમાં વહેંચવામાં આવે છે અને દરેક બોક્સ માટે અલગ શિપિંગ ફી લાગુ પડે છે.', 'एक मज़बूत मानक बॉक्स में 40 पाउंड तक सामान आता है। इससे भारी ऑर्डर को अतिरिक्त बॉक्स में बाँटा जाता है और हर बॉक्स पर अलग शिपिंग शुल्क लगता है।'],
  'Picking up at our store in Tennessee is 100% free ($0.00). Simply select "Pickup in Store" at checkout, and pay by Zelle, Card, or in person upon collection.': ['ટેનેસીના અમારા સ્ટોરેથી પિકઅપ સંપૂર્ણ મફત ($0.00) છે. ચેકઆઉટ વખતે "સ્ટોરમાંથી પિકઅપ" પસંદ કરો અને Zelle, કાર્ડ અથવા સામાન લેતી વખતે ચુકવણી કરો.', 'टेनेसी के हमारे स्टोर से पिकअप पूरी तरह मुफ़्त ($0.00) है। चेकआउट पर "स्टोर से पिकअप" चुनें और Zelle, कार्ड या सामान लेते समय भुगतान करें।'],
  'Choose your state and order weight to estimate delivery. The rate is shown before you continue to checkout.': ['ડિલિવરીનો અંદાજ મેળવવા રાજ્ય અને ઓર્ડરનું વજન પસંદ કરો. ચેકઆઉટ આગળ વધતા પહેલાં દર બતાવવામાં આવશે.', 'डिलीवरी का अनुमान पाने के लिए राज्य और ऑर्डर का वज़न चुनें। चेकआउट पर आगे बढ़ने से पहले दर दिखा दी जाएगी।'],
  'Choose an order weight and destination state to see an estimate. Each shipping box holds up to 40 lb.': ['અંદાજ જોવા માટે ઓર્ડરનું વજન અને ગંતવ્ય રાજ્ય પસંદ કરો. દરેક શિપિંગ બોક્સમાં 40 પાઉન્ડ સુધી સામાન આવે છે.', 'अनुमान देखने के लिए ऑर्डर का वज़न और गंतव्य राज्य चुनें। हर शिपिंग बॉक्स में 40 पाउंड तक सामान आता है।'],
  'Up to 40 lb / box': ['બોક્સ દીઠ 40 પાઉન્ડ સુધી', 'हर बॉक्स में 40 पाउंड तक'],
  '20 lb free space in box': ['બોક્સમાં 20 પાઉન્ડ જગ્યા બાકી', 'बॉक्स में 20 पाउंड जगह खाली'],
  'Tennessee Mill': ['ટેનેસી મિલ', 'टेनेसी की चक्की'],
  'See the delivery estimate for every U.S. state below. Rates are estimates per 40 lb box and may change based on carrier pricing.': ['દરેક અમેરિકી રાજ્ય માટેનો ડિલિવરી અંદાજ નીચે જુઓ. દર 40 પાઉન્ડના બોક્સ દીઠ છે અને કુરિયર દર પ્રમાણે બદલાઈ શકે છે.', 'हर अमेरिकी राज्य के लिए डिलीवरी अनुमान नीचे देखें। दरें प्रति 40 पाउंड बॉक्स के लिए हैं और कूरियर की कीमतों के अनुसार बदल सकती हैं।'],
  'Delivery fees are estimates only. The final shipping amount is confirmed before payment.': ['ડિલિવરી ફી માત્ર અંદાજ છે. ચુકવણી પહેલાં અંતિમ શિપિંગ રકમની પુષ્ટિ કરવામાં આવશે.', 'डिलीवरी शुल्क केवल अनुमान है। भुगतान से पहले अंतिम शिपिंग राशि की पुष्टि की जाएगी।'],
  'Shipping & Delivery Policy': ['શિપિંગ અને ડિલિવરી નીતિ', 'शिपिंग और डिलीवरी नीति'],
  'Return & Refund Policy': ['વળતર અને રિફંડ નીતિ', 'वापसी और रिफंड नीति'],
  'Email Address': ['ઈમેલ સરનામું', 'ईमेल पता'],
  'Phone Number': ['ફોન નંબર', 'फ़ोन नंबर'],
  Name: ['નામ', 'नाम'],
  Address: ['સરનામું', 'पता'],
  City: ['શહેર', 'शहर'],
  State: ['રાજ્ય', 'राज्य'],
  'ZIP Code': ['ઝિપ કોડ', 'ज़िप कोड'],
  'Card Number': ['કાર્ડ નંબર', 'कार्ड नंबर'],
  'About Our Mill': ['અમારી મિલ વિશે', 'हमारी चक्की के बारे में'],
  'Contact Us': ['અમારો સંપર્ક કરો', 'हमसे संपर्क करें'],
  'Billing ZIP': ['બિલિંગ ઝિપ કોડ', 'बिलिंग ज़िप कोड'],
  'Item removed from basket': ['વસ્તુ ટોપલીમાંથી દૂર કરી', 'सामान कार्ट से हटा दिया गया'],
  'Popular:': ['લોકપ્રિય:', 'लोकप्रिय:'],
  item: ['વસ્તુ', 'सामान'],
  items: ['વસ્તુઓ', 'सामान'],
  Flours: ['લોટ', 'आटा'],
  Grains: ['અનાજ', 'अनाज'],
  Snacks: ['નાસ્તા', 'नाश्ता'],
  'Milled Daily in USA': ['અમેરિકામાં દરરોજ દળેલું', 'अमेरिका में रोज़ पिसा'],
  '100% Stoneground': ['100% પથ્થરની ઘંટીમાં દળેલું', '100% पत्थर की चक्की में पिसा'],
  'Current box is full. Additional items begin a new 40 lb box.': ['હાલનું બોક્સ ભરાઈ ગયું છે. વધારાનો સામાન નવા 40 પાઉન્ડના બોક્સમાં જશે.', 'मौजूदा बॉक्स भर गया है। अतिरिक्त सामान नए 40 पाउंड के बॉक्स में जाएगा।'],
  'Your basket has items marked "Pickup Only" (Mamra/Snacks). Switch to Store Pickup at checkout to complete this order.': ['તમારી ટોપલીમાં "ફક્ત પિકઅપ" માટેની વસ્તુઓ (મમરા/નાસ્તા) છે. ઓર્ડર પૂરો કરવા ચેકઆઉટમાં સ્ટોર પિકઅપ પસંદ કરો.', 'आपकी कार्ट में "केवल पिकअप" वाले सामान (ममरा/नाश्ता) हैं। ऑर्डर पूरा करने के लिए चेकआउट में स्टोर पिकअप चुनें।'],
  'Discover freshly stoneground Indian flours and whole grains milled daily upon order.': ['ઓર્ડર મળતાં જ દરરોજ તાજા દળેલા ભારતીય લોટ અને આખા અનાજ જુઓ.', 'ऑर्डर मिलते ही रोज़ ताज़ा पिसा भारतीय आटा और साबुत अनाज देखें।'],
  Soon: ['ટૂંક સમયમાં', 'जल्द आ रहा है'],
  Ingredients: ['સામગ્રી', 'सामग्री'],
  'Miller\'s Tip': ['મિલરની સલાહ', 'मिलर की सलाह'],
  'Recommended Flour': ['ભલામણ કરેલો લોટ', 'सुझाया गया आटा'],
  'Cook:': ['બનાવવાનો સમય:', 'पकाने का समय:'],
  'Serves:': ['કેટલા લોકો માટે:', 'कितने लोगों के लिए:'],
  'Mill Quality Standards': ['મિલના ગુણવત્તા ધોરણો', 'चक्की के गुणवत्ता मानक'],
  '1. Contact Information': ['1. સંપર્ક માહિતી', '1. संपर्क जानकारी'],
  '2. Choose Delivery Method': ['2. ડિલિવરીનો પ્રકાર પસંદ કરો', '2. डिलीवरी का तरीका चुनें'],
  'Order Items': ['ઓર્ડરની વસ્તુઓ', 'ऑर्डर का सामान'],
  'Order Items (': ['ઓર્ડરની વસ્તુઓ (', 'ऑर्डर का सामान ('],
  'Total Weight': ['કુલ વજન', 'कुल वज़न'],
  'Grocery Tax': ['કરિયાણાનો કર', 'किराने का टैक्स'],
  'Final Total': ['અંતિમ કુલ', 'अंतिम कुल'],
  'Street Address *': ['શેરીનું સરનામું *', 'सड़क का पता *'],
  'Apartment, Suite, Unit (optional)': ['એપાર્ટમેન્ટ, સ્યુટ, યુનિટ (વૈકલ્પિક)', 'अपार्टमेंट, सुइट, यूनिट (वैकल्पिक)'],
  'City *': ['શહેર *', 'शहर *'],
  'State *': ['રાજ્ય *', 'राज्य *'],
  'ZIP Code *': ['ઝિપ કોડ *', 'ज़िप कोड *'],
  'Packed in 40 lb heavy boxes & shipped to your address': ['40 પાઉન્ડના મજબૂત બોક્સમાં પેક કરીને તમારા સરનામે મોકલવામાં આવશે', '40 पाउंड के मज़बूत बॉक्स में पैक करके आपके पते पर भेजा जाएगा'],
  'Pick up directly at our Tennessee mill': ['ટેનેસીની અમારી મિલેથી સીધો પિકઅપ કરો', 'टेनेसी की हमारी चक्की से सीधे पिकअप करें'],
  'We will send your order receipt and daily stone-milling status to this email and phone.': ['તમારી ઓર્ડરની રસીદ અને દળવાની સ્થિતિ આ ઈમેલ અને ફોન પર મોકલીશું.', 'आपकी ऑर्डर रसीद और पिसाई की स्थिति इस ईमेल और फ़ोन पर भेजेंगे।'],
  'Needed for carrier box delivery notifications or store pickup verification.': ['કુરિયર ડિલિવરીના અપડેટ અથવા સ્ટોર પિકઅપની પુષ્ટિ માટે જરૂરી.', 'कूरियर डिलीवरी अपडेट या स्टोर पिकअप की पुष्टि के लिए ज़रूरी।'],
  'View Cart': ['ટોપલી જુઓ', 'कार्ट देखें'],
  'Total Weight (': ['કુલ વજન (', 'कुल वज़न ('],
  '0% fee by Zelle or In-Store': ['Zelle અથવા સ્ટોર પર ચુકવણી પર 0% ફી', 'Zelle या स्टोर पर भुगतान पर 0% शुल्क'],
  'Total Weight (4 lb)': ['કુલ વજન (4 પાઉન્ડ)', 'कुल वज़न (4 पाउंड)'],
  '1 box (max 40 lb/box)': ['1 બોક્સ (દરેકમાં 40 પાઉન્ડ સુધી)', '1 बॉक्स (हर बॉक्स में 40 पाउंड तक)'],
  'box (max': ['બોક્સ (મહત્તમ', 'बॉक्स (अधिकतम'],
  'lb/box)': ['પાઉન્ડ/બોક્સ)', 'पाउंड/बॉक्स)'],
  'Remove item': ['વસ્તુ દૂર કરો', 'सामान हटाएँ'],
  'Pack:': ['પેક:', 'पैक:'],
  'e.g. pratik@example.com': ['દા.ત. pratik@example.com', 'जैसे pratik@example.com'],
  'e.g. Pratik Patel': ['દા.ત. પ્રતિક પટેલ', 'जैसे प्रतीक पटेल'],
  'e.g. 423-664-3353': ['દા.ત. 423-664-3353', 'जैसे 423-664-3353'],
  'e.g. 124 Main Street': ['દા.ત. 124 Main Street', 'जैसे 124 Main Street'],
  'e.g. Apt 4B': ['દા.ત. Apt 4B', 'जैसे Apt 4B'],
  'e.g. Atlanta': ['દા.ત. Atlanta', 'जैसे Atlanta'],
  'e.g. 30301': ['દા.ત. 30301', 'जैसे 30301'],
  'Do I need an account to place an order?': ['ઓર્ડર કરવા માટે એકાઉન્ટ જરૂરી છે?', 'क्या ऑर्डर करने के लिए खाता ज़रूरी है?'],
  'No. You can order with just your name, phone number, and email address. An account is convenient if you reorder regularly to save your address and repeat your favorite flours in one tap.': ['ના. ઓર્ડર માટે તમારું નામ, ફોન નંબર અને ઈમેલ પૂરતા છે. વારંવાર ઓર્ડર કરતા હો તો સરનામું સાચવવા અને ફરીથી ઓર્ડર કરવા એકાઉન્ટ ઉપયોગી છે.', 'नहीं। ऑर्डर के लिए आपका नाम, फ़ोन नंबर और ईमेल काफ़ी हैं। बार-बार ऑर्डर करने पर पता सहेजने और दोबारा ऑर्डर करने के लिए खाता उपयोगी है।']
  ,
  'No. Grain is heavy, and we would only be adding the cost back into the price of the flour. You pay what it actually costs to send, worked out from the weight of your order and how far it has to travel. You see the exact amount before you type in any card details.': ['ના. અનાજ ભારે હોય છે; ડિલિવરીનો ખર્ચ લોટની કિંમતમાં ઉમેરવો પડે. તમે ઓર્ડરના વજન અને અંતર પ્રમાણે મોકલવાનો વાસ્તવિક ખર્ચ જ ચૂકવો છો. કાર્ડની માહિતી આપતાં પહેલાં ચોક્કસ રકમ જોઈ શકો છો.', 'नहीं। अनाज भारी होता है; डिलीवरी का खर्च आटे की कीमत में जोड़ना पड़ेगा। आप ऑर्डर के वज़न और दूरी के अनुसार भेजने का वास्तविक खर्च ही चुकाते हैं। कार्ड की जानकारी देने से पहले सही राशि दिखती है।'],
  'We can safely put 40 lb of product in one box. An order heavier than that is split across more than one, and each box costs its own shipping. Nothing is hidden — the basket shows you the number of boxes, the weight, and the transparent carrier total.': ['એક બોક્સમાં 40 પાઉન્ડ સુધી સામાન સુરક્ષિત રીતે મૂકી શકાય છે. વધુ વજનનો ઓર્ડર એકથી વધુ બોક્સમાં વહેંચાય છે અને દરેક બોક્સનો શિપિંગ ખર્ચ અલગ હોય છે. કોઈ છુપો ખર્ચ નથી — ટોપલીમાં બોક્સની સંખ્યા, વજન અને કુરિયરનો કુલ ખર્ચ દેખાય છે.', 'एक बॉक्स में 40 पाउंड तक सामान सुरक्षित रखा जा सकता है। इससे भारी ऑर्डर को कई बॉक्स में बाँटा जाता है और हर बॉक्स का शिपिंग खर्च अलग होता है। कोई छिपा शुल्क नहीं — कार्ट में बॉक्स की संख्या, वज़न और कूरियर का कुल खर्च दिखता है।'],
  'No. One bag or ten, the price per bag is the same. If you want a pallet-sized amount for a temple, catering business, or grocery store, please call us directly at +1 (423) 664-3353 and we will work out a wholesale freight price with you.': ['ના. એક થેલી લો કે દસ, દરેક થેલીની કિંમત સરખી છે. મંદિર, કેટરિંગ અથવા કરિયાણાની દુકાન માટે પેલેટ જેટલો જથ્થો જોઈએ તો +1 (423) 664-3353 પર ફોન કરો; અમે થોક ડિલિવરીનો ભાવ નક્કી કરીશું.', 'नहीं। एक बैग लें या दस, हर बैग की कीमत समान है। मंदिर, कैटरिंग या किराने की दुकान के लिए पैलेट जितनी मात्रा चाहिए तो +1 (423) 664-3353 पर कॉल करें; हम थोक डिलीवरी का भाव तय करेंगे।'],
  'Yes. We mill every day and pack directly from what we have just milled, so nothing sits for months the way it does in a grocery shop. Whole grain flour begins to lose its natural smell and sweet taste within weeks of being ground, which is why store-bought flour tastes flat and requires chemical dough conditioners.': ['હા. અમે દરરોજ દળીએ છીએ અને તાજા દળેલા લોટને તરત પેક કરીએ છીએ, તેથી તે દુકાનના લોટની જેમ મહિનાઓ સુધી પડ્યો રહેતો નથી. આખા અનાજનો લોટ દળ્યાના થોડા અઠવાડિયામાં તેની કુદરતી સુગંધ અને મીઠાશ ગુમાવવા લાગે છે; તેથી દુકાનનો લોટ ફિક્કો લાગે છે અને તેમાં લોટ સુધારક રસાયણો ઉમેરવામાં આવે છે.', 'हाँ। हम रोज़ आटा पीसते हैं और ताज़ा पिसे आटे को तुरंत पैक करते हैं, इसलिए यह दुकानों के आटे की तरह महीनों पड़ा नहीं रहता। साबुत अनाज का आटा पिसने के कुछ हफ़्तों में अपनी प्राकृतिक खुशबू और मिठास खोने लगता है; इसी कारण बाज़ार का आटा फीका लगता है और उसमें आटा सुधारने वाले रसायन मिलाए जाते हैं।'],
  'Each flour comes ground in its traditional culinary texture (e.g. Chapati Flour is fine, Bhakhari Flour is coarse karkaro, Ladu Besan is danedaar, Handvo is multi-grain coarse). If we offer customizable coarseness for a flour in the future, it will be selectable on the product page for that flour.': ['દરેક લોટ તેની પરંપરાગત વાનગી માટે યોગ્ય કરકરાશમાં દળવામાં આવે છે (જેમ કે ચપાતીનો લોટ ઝીણો, ભાખરીનો લોટ કરકરો, લાડુ બેસન દાણેદાર અને હાંડવો મલ્ટિગ્રેન કરકરો હોય છે). ભવિષ્યમાં કોઈ લોટ માટે કરકરાશ પસંદ કરવાનો વિકલ્પ આપીએ તો તે ઉત્પાદનના પેજ પર ઉપલબ્ધ રહેશે.', 'हर आटा उसकी पारंपरिक रेसिपी के अनुसार पिसा जाता है (जैसे चपाती का आटा महीन, भाखरी का आटा मोटा-कुरकुरा, लड्डू बेसन दानेदार और हांडवो मल्टीग्रेन मोटा होता है)। भविष्य में किसी आटे के लिए मोटापन चुनने का विकल्प हुआ तो वह उसके उत्पाद पेज पर मिलेगा।'],
  'Three ways: by card on the website, by Zelle, or in person when you pick up from our store. If you pay by Zelle, we give you a short order reference code (looks like FF-2026-XXXX) to write in your bank transfer memo, so we know the payment is yours. A shipped order is packed and dispatched once your payment reaches us.': ['ત્રણ રીતે ચુકવણી કરી શકો છો: વેબસાઇટ પર કાર્ડથી, Zelleથી અથવા સ્ટોરમાંથી પિકઅપ વખતે. Zelleથી ચૂકવો તો અમે ટૂંકો ઓર્ડર સંદર્ભ કોડ (FF-2026-XXXX જેવો) આપીએ છીએ; બેંક ટ્રાન્સફરના મેમોમાં લખશો જેથી ચુકવણી ઓળખી શકાય. ચુકવણી મળ્યા પછી મોકલવાનો ઓર્ડર પેક કરીને રવાના કરવામાં આવે છે.', 'तीन तरीकों से भुगतान करें: वेबसाइट पर कार्ड से, Zelle से या स्टोर से पिकअप के समय। Zelle से भुगतान पर हम छोटा ऑर्डर रेफ़रेंस कोड (FF-2026-XXXX जैसा) देते हैं, जिसे बैंक ट्रांसफ़र के मेमो में लिखें ताकि भुगतान की पहचान हो सके। भुगतान मिलने पर भेजने वाला ऑर्डर पैक करके रवाना किया जाता है।'],
  'Yes. Every card payment, debit or credit, adds a transparent 3% card processing fee to the total — items, delivery, and tax. You see it clearly as its own line item before entering any card details, and it appears on your invoice. Paying by Zelle or paying at the store has zero processing fee (0%).': ['હા. ડેબિટ કે ક્રેડિટ કાર્ડથી ચુકવણી પર વસ્તુઓ, ડિલિવરી અને કરના કુલ પર પારદર્શક 3% કાર્ડ પ્રોસેસિંગ ફી લાગે છે. કાર્ડની માહિતી આપતાં પહેલાં આ ફી અલગથી બતાવવામાં આવે છે અને ઇન્વૉઇસમાં પણ દેખાય છે. Zelle અથવા સ્ટોર પર ચુકવણીમાં પ્રોસેસિંગ ફી નથી (0%).', 'हाँ। डेबिट या क्रेडिट कार्ड से भुगतान पर सामान, डिलीवरी और टैक्स के कुल पर पारदर्शी 3% कार्ड प्रोसेसिंग शुल्क लगता है। कार्ड की जानकारी देने से पहले यह अलग से दिखता है और इनवॉइस में भी आता है। Zelle या स्टोर पर भुगतान पर प्रोसेसिंग शुल्क नहीं (0%)।'],
  'Yes! Choose "Pickup in Store" at checkout and there is nothing to pay for delivery ($0.00). You can pay online, by Zelle, or at the store when you pick up. A relative or friend can also pick up on your behalf with your order number. Certain fragile or light bulky items (like Mamra and Khakharas) are pickup-only because they cannot be shipped safely in heavy grain boxes.': ['હા! ચેકઆઉટ વખતે "સ્ટોરમાંથી પિકઅપ" પસંદ કરો; ડિલિવરી માટે કોઈ ચાર્જ નથી ($0.00). તમે ઑનલાઇન, Zelleથી અથવા પિકઅપ વખતે સ્ટોર પર ચૂકવણી કરી શકો છો. તમારો ઓર્ડર નંબર આપીને સગા કે મિત્ર પણ પિકઅપ કરી શકે છે. મમરા અને ખાખરા જેવી કેટલીક નાજુક અથવા હલકી-મોટી વસ્તુઓ ફક્ત પિકઅપ માટે છે, કારણ કે ભારે અનાજના બોક્સમાં સલામત રીતે મોકલી શકાતી નથી.', 'हाँ! चेकआउट पर "स्टोर से पिकअप" चुनें; डिलीवरी का कोई शुल्क नहीं ($0.00)। आप ऑनलाइन, Zelle से या पिकअप के समय स्टोर पर भुगतान कर सकते हैं। आपका ऑर्डर नंबर लेकर रिश्तेदार या मित्र भी पिकअप कर सकते हैं। ममरा और खाखरा जैसी कुछ नाज़ुक या हल्की-भारी चीज़ें केवल पिकअप के लिए हैं, क्योंकि उन्हें भारी अनाज के बॉक्स में सुरक्षित नहीं भेजा जा सकता।'],
  'Only before we seal the box. Once your box is taped and the carrier label is scanned, it is on its way. Please verify your address carefully at checkout. If you spot a mistake, call us right away at +1 (423) 664-3353.': ['બોક્સ સીલ થાય તે પહેલાં જ સરનામું બદલી શકાય છે. બોક્સ ટેપ કરીને કુરિયર લેબલ સ્કેન થયા પછી તે રવાના થઈ જાય છે. ચેકઆઉટ વખતે સરનામું કાળજીપૂર્વક તપાસો. ભૂલ જણાય તો તરત +1 (423) 664-3353 પર ફોન કરો.', 'पता केवल बॉक्स सील होने से पहले बदला जा सकता है। बॉक्स पर टेप लगने और कूरियर लेबल स्कैन होने के बाद वह रवाना हो जाता है। चेकआउट पर पता ध्यान से जाँचें। गलती दिखे तो तुरंत +1 (423) 664-3353 पर कॉल करें।']
};

const TEXT_ATTRIBUTES = ['aria-label', 'placeholder', 'title'];

export function translateText(value, lang) {
  if (lang === 'en' || typeof value !== 'string') return value;

  const normalized = value.replace(/\s+/g, ' ').trim();
  const weightLabel = normalized.match(/^([\d.]+) lb$/);
  if (weightLabel) {
    return lang === 'gu'
      ? `${weightLabel[1]} પાઉન્ડ`
      : `${weightLabel[1]} पाउंड`;
  }

  const deliveryEstimateLabel = normalized.match(/^Estimated delivery to (.+) (\d{5})$/);
  if (deliveryEstimateLabel) {
    return lang === 'gu'
      ? `${deliveryEstimateLabel[2]} ZIP કોડ, ${deliveryEstimateLabel[1]} માટે અંદાજિત ડિલિવરી`
      : `${deliveryEstimateLabel[1]} ${deliveryEstimateLabel[2]} ZIP कोड के लिए अनुमानित डिलीवरी`;
  }

  const deliveryBoxes = normalized.match(/^(\d+) box(?:es)? · up to 40 lb per box$/);
  if (deliveryBoxes) {
    return lang === 'gu'
      ? `${deliveryBoxes[1]} બોક્સ · દરેક બોક્સમાં 40 પાઉન્ડ સુધી`
      : `${deliveryBoxes[1]} बॉक्स · हर बॉक्स में 40 पाउंड तक`;
  }

  const estimatedWeight = normalized.match(/^([\d.]+) lb$/);
  if (estimatedWeight) {
    return lang === 'gu'
      ? `${estimatedWeight[1]} પાઉન્ડ`
      : `${estimatedWeight[1]} पाउंड`;
  }
  const remainingBoxSpace = normalized.match(/^You can fit (\d+) lb more in this box with no extra box fee\.$/);
  if (remainingBoxSpace) {
    const [, weight] = remainingBoxSpace;
    return lang === 'gu'
      ? `આ બોક્સમાં વધારાની બોક્સ ફી વિના ${weight} પાઉન્ડ વધુ મૂકી શકો છો.`
      : `इस बॉक्स में बिना अतिरिक्त शुल्क के ${weight} पाउंड और रख सकते हैं।`;
  }

  const boxPacking = normalized.match(/^Box (\d+) Packing: ([\d.]+) lb of ([\d.]+) lb$/);
  if (boxPacking) {
    const [, boxNumber, filledWeight, capacity] = boxPacking;
    return lang === 'gu'
      ? `બોક્સ ${boxNumber} પેકિંગ: ${capacity}માંથી ${filledWeight} પાઉન્ડ`
      : `बॉक्स ${boxNumber} पैकिंग: ${capacity} में से ${filledWeight} पाउंड`;
  }

  const totalWeight = normalized.match(/^Total Weight \(([\d.]+) lb\)$/);
  if (totalWeight) {
    return lang === 'gu'
      ? `કુલ વજન (${totalWeight[1]} પાઉન્ડ)`
      : `कुल वज़न (${totalWeight[1]} पाउंड)`;
  }

  const boxCount = normalized.match(/^(\d+) box(?:es)? \(max ([\d.]+) lb\/box\)$/);
  if (boxCount) {
    return lang === 'gu'
      ? `${boxCount[1]} બોક્સ (દરેકમાં ${boxCount[2]} પાઉન્ડ સુધી)`
      : `${boxCount[1]} बॉक्स (हर बॉक्स में ${boxCount[2]} पाउंड तक)`;
  }

  const orderWeightSummary = normalized.match(/^([\d.]+) lb \((\d+) box(?:es)?\)$/);
  if (orderWeightSummary) {
    return lang === 'gu'
      ? `${orderWeightSummary[1]} પાઉન્ડ (${orderWeightSummary[2]} બોક્સ)`
      : `${orderWeightSummary[1]} पाउंड (${orderWeightSummary[2]} बॉक्स)`;
  }

  const itemSize = normalized.match(/^Size: ([\d.]+) lb$/);
  if (itemSize) {
    return lang === 'gu'
      ? `કદ: ${itemSize[1]} પાઉન્ડ`
      : `आकार: ${itemSize[1]} पाउंड`;
  }

  const addedToBasket = normalized.match(/^Added (\d+) × (.+) \((.+)\) to basket$/);
  if (addedToBasket) {
    const [, quantity, product, size] = addedToBasket;
    return lang === 'gu'
      ? `ટોપલીમાં ${quantity} × ${product} (${size}) ઉમેર્યું`
      : `कार्ट में ${quantity} × ${product} (${size}) जोड़ा`;
  }

  const orderItems = normalized.match(/^Order Items \((\d+)\)$/);
  if (orderItems) {
    return lang === 'gu'
      ? `ઓર્ડરની વસ્તુઓ (${orderItems[1]})`
      : `ऑर्डर का सामान (${orderItems[1]})`;
  }

  const translation = UI_TRANSLATIONS[normalized];
  if (!translation) return value;

  const leadingWhitespace = value.match(/^\s*/)?.[0] ?? '';
  const trailingWhitespace = value.match(/\s*$/)?.[0] ?? '';
  return `${leadingWhitespace}${translation[lang === 'gu' ? 0 : 1]}${trailingWhitespace}`;
}

function localizeNode(node, lang) {
  if (typeof node === 'string') return translateText(node, lang);
  if (Array.isArray(node)) return Children.map(node, child => localizeNode(child, lang));
  if (!isValidElement(node)) return node;

  const props = {};
  TEXT_ATTRIBUTES.forEach(attribute => {
    if (typeof node.props[attribute] === 'string') {
      props[attribute] = translateText(node.props[attribute], lang);
    }
  });
  if (node.props.children !== undefined) {
    props.children = Children.map(node.props.children, child => localizeNode(child, lang));
  }
  return cloneElement(node, props);
}

export default function LocalizedContent({ children }) {
  const { lang } = useCart();
  return localizeNode(children, lang);
}
