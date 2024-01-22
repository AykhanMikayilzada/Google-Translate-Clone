const select1 = document.querySelector(".select1");
const select2 = document.querySelector(".select2");
const translation = document.querySelector(".translation");
const clientText = document.querySelector(".clientText");
const translateBtn = document.querySelector(".translateBtn");

let parameters = {
  code1: null,
  code2: null,
  text: clientText.value,
};

async function POST(source, code, string) {
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "c1d4de5f39mshf1a3c680fbee6c8p1d6514jsnd636535a7dc2",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: `${source}`,
      target_language: `${code}`,
      text: `${string}`,
    }),
  };

  try {
    const response = await fetch(url, options);
    let result = await response.json();
    result = result.data;
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function GET() {
  const url = "https://text-translator2.p.rapidapi.com/getLanguages";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c1d4de5f39mshf1a3c680fbee6c8p1d6514jsnd636535a7dc2",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    let result = await response.json();
    result = result.data.languages;
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function logLanguagesSetCodes() {
  const data = await GET();
  data.map((item) => {
    select1.innerHTML += `<option>${item.name}:
      <div d-0>${item.code}</div>
    </option>`;
    select2.innerHTML += `<option>${item.name}:
    <div d-0>${item.code}</div>
    </option>`;
    return;
  });
}

logLanguagesSetCodes();

clientText.addEventListener("keypress", () => {
  parameters.text = clientText.value;
});

select1.addEventListener("change", () => {
  let firstValue = select1.value;
  var metin = "Azerbaijani az";

  if (firstValue.length >= 2) {
    let code = firstValue.slice(-2);
    parameters.code1 = code;
  } else {
    return;
  }
});
select2.addEventListener("change", () => {
  let secondValue = select2.value;
  if (secondValue.length >= 2) {
    let code = secondValue.slice(-2);
    parameters.code2 = code;
  } else {
    return;
  }
});

translateBtn.addEventListener("click", async () => {
  parameters.text = clientText.value;

  console.log(parameters);

  translateBtn.disabled = true;
  translateBtn.innerHTML = `Translate <div class="spinner-border spinner-border-sm" role="status">
  <span class="sr-only"></span>
</div>`

  const translationResult = await POST(parameters.code1, parameters.code2, parameters.text);
  
  translation.textContent = translationResult.translatedText;

  translateBtn.disabled = false;
  translateBtn.innerHTML = `Translate`

});