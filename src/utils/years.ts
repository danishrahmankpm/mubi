export const year_map:Record<string,string> = {
  "2000": "2000s",
  "2001": "2000s",
  "2002": "2000s",
  "2003": "2000s",
  "2004": "2000s",
  "2005": "2000s",
  "2006": "2000s",
  "2007": "2000s",
  "2008": "2000s",
  "2009": "2000s",

  "2010": "2010s",
  "2011": "2010s",
  "2012": "2010s",
  "2013": "2010s",
  "2014": "2010s",
  "2015": "2010s",
  "2016": "2010s",
  "2017": "2010s",
  "2018": "2010s",
  "2019": "2010s",

  "2020": "2020s",
  "2021": "2020s",
  "2022": "2020s",
  "2023": "2020s",
  "2024": "2020s",
  "2025": "2020s"
};
export function extractYear(year:string):string | null{
    if(year.length>3){
        if (year in year_map) return year_map[year];
        else return null;
    }
    else{
        return null
    }
}