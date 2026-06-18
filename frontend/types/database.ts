export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      confluence_tags: {
        Row: {
          category: Database["public"]["Enums"]["confluence_category"]
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["confluence_category"]
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["confluence_category"]
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          user_id?: string
        }
      }
      chart_snapshots: {
        Row: {
          created_at: string
          id: string
          image_url: string
          notes: string | null
          symbol: string
          timeframe: string | null
          trade_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          notes?: string | null
          symbol: string
          timeframe?: string | null
          trade_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          notes?: string | null
          symbol?: string
          timeframe?: string | null
          trade_id?: string | null
          updated_at?: string
          user_id?: string
        }
      }
      market_snapshots: {
        Row: {
          bias: string | null
          created_at: string
          id: string
          key_levels: Json | null
          notes: string | null
          session: Database["public"]["Enums"]["market_session"]
          snapshot_time: string
          trade_id: string | null
          user_id: string
          volatility: Database["public"]["Enums"]["volatility_state"] | null
        }
        Insert: {
          bias?: string | null
          created_at?: string
          id?: string
          key_levels?: Json | null
          notes?: string | null
          session: Database["public"]["Enums"]["market_session"]
          snapshot_time?: string
          trade_id?: string | null
          user_id: string
          volatility?: Database["public"]["Enums"]["volatility_state"] | null
        }
        Update: {
          bias?: string | null
          created_at?: string
          id?: string
          key_levels?: Json | null
          notes?: string | null
          session?: Database["public"]["Enums"]["market_session"]
          snapshot_time?: string
          trade_id?: string | null
          user_id?: string
          volatility?: Database["public"]["Enums"]["volatility_state"] | null
        }
      }
      trade_confluences: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          tag_id: string
          trade_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          tag_id: string
          trade_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          tag_id?: string
          trade_id?: string
          user_id?: string
        }
      }
      trade_screenshots: {
        Row: {
          created_at: string
          id: string
          label: string | null
          sort_order: number
          storage_path: string
          trade_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          sort_order?: number
          storage_path: string
          trade_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          sort_order?: number
          storage_path?: string
          trade_id?: string
          user_id?: string
        }
      }
      trades: {
        Row: {
          created_at: string
          direction: Database["public"]["Enums"]["trade_direction"]
          entry_price: number
          entry_time: string
          exit_price: number | null
          exit_time: string | null
          id: string
          instrument: string
          notes: string | null
          outcome: Database["public"]["Enums"]["trade_outcome"] | null
          position_size: number | null
          rating: number | null
          reward_amount: number | null
          risk_amount: number | null
          risk_reward_ratio: number | null
          session: Database["public"]["Enums"]["market_session"] | null
          setup_type: string | null
          status: Database["public"]["Enums"]["trade_status"]
          stop_loss: number | null
          take_profit: number | null
          timeframe: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          direction: Database["public"]["Enums"]["trade_direction"]
          entry_price: number
          entry_time: string
          exit_price?: number | null
          exit_time?: string | null
          id?: string
          instrument: string
          notes?: string | null
          outcome?: Database["public"]["Enums"]["trade_outcome"] | null
          position_size?: number | null
          rating?: number | null
          reward_amount?: number | null
          risk_amount?: number | null
          risk_reward_ratio?: number | null
          session?: Database["public"]["Enums"]["market_session"] | null
          setup_type?: string | null
          status?: Database["public"]["Enums"]["trade_status"]
          stop_loss?: number | null
          take_profit?: number | null
          timeframe?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          direction?: Database["public"]["Enums"]["trade_direction"]
          entry_price?: number
          entry_time?: string
          exit_price?: number | null
          exit_time?: string | null
          id?: string
          instrument?: string
          notes?: string | null
          outcome?: Database["public"]["Enums"]["trade_outcome"] | null
          position_size?: number | null
          rating?: number | null
          reward_amount?: number | null
          risk_amount?: number | null
          risk_reward_ratio?: number | null
          session?: Database["public"]["Enums"]["market_session"] | null
          setup_type?: string | null
          status?: Database["public"]["Enums"]["trade_status"]
          stop_loss?: number | null
          take_profit?: number | null
          timeframe?: string | null
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      seed_default_tags: {
        Args: {
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      confluence_category:
        | "market_structure"
        | "order_flow"
        | "supply_demand"
        | "liquidity"
        | "time_price"
        | "indicator"
        | "fundamental"
      market_session: "asia" | "london" | "new_york" | "overlap_london_ny"
      trade_direction: "long" | "short"
      trade_outcome: "win" | "loss" | "breakeven"
      trade_status: "open" | "closed" | "cancelled"
      volatility_state: "low" | "medium" | "high" | "extreme"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
