export interface DecodedToken {
  nameid?: string; // دا اللي انت حاطه في التوكن
  email?: string;
  unique_name?: string;
  // أضف أي claim تاني محتاجه
  [key: string]: any;
}
