export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_factors: {
        Row: {
          created_at: string | null
          hormone_cycle_day: number | null
          humidity_percent: number | null
          id: string
          skin_log_id: string
          sleep_hours: number | null
          stress_level: number | null
          temperature_celsius: number | null
          updated_at: string | null
          water_intake_ml: number | null
          weather_condition: string | null
        }
        Insert: {
          created_at?: string | null
          hormone_cycle_day?: number | null
          humidity_percent?: number | null
          id?: string
          skin_log_id: string
          sleep_hours?: number | null
          stress_level?: number | null
          temperature_celsius?: number | null
          updated_at?: string | null
          water_intake_ml?: number | null
          weather_condition?: string | null
        }
        Update: {
          created_at?: string | null
          hormone_cycle_day?: number | null
          humidity_percent?: number | null
          id?: string
          skin_log_id?: string
          sleep_hours?: number | null
          stress_level?: number | null
          temperature_celsius?: number | null
          updated_at?: string | null
          water_intake_ml?: number | null
          weather_condition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_factors_skin_log_id_fkey"
            columns: ["skin_log_id"]
            isOneToOne: false
            referencedRelation: "skin_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      food_intake: {
        Row: {
          created_at: string | null
          food_id: string | null
          food_name: string
          id: string
          intake_date: string
          meal_type: string | null
          notes: string | null
          quantity: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          food_id?: string | null
          food_name: string
          id?: string
          intake_date?: string
          meal_type?: string | null
          notes?: string | null
          quantity?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          food_id?: string | null
          food_name?: string
          id?: string
          intake_date?: string
          meal_type?: string | null
          notes?: string | null
          quantity?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      product_usage: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          product_id: string
          product_type: string
          rating: number | null
          updated_at: string | null
          usage_date: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          product_id: string
          product_type: string
          rating?: number | null
          updated_at?: string | null
          usage_date?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          product_id?: string
          product_type?: string
          rating?: number | null
          updated_at?: string | null
          usage_date?: string
          user_id?: string
        }
        Relationships: []
      }
      skin_logs: {
        Row: {
          acne_level: number | null
          created_at: string | null
          hydration_level: number | null
          id: string
          log_date: string
          notes: string | null
          oiliness_level: number | null
          overall_condition: string
          redness_level: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          acne_level?: number | null
          created_at?: string | null
          hydration_level?: number | null
          id?: string
          log_date?: string
          notes?: string | null
          oiliness_level?: number | null
          overall_condition: string
          redness_level?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          acne_level?: number | null
          created_at?: string | null
          hydration_level?: number | null
          id?: string
          log_date?: string
          notes?: string | null
          oiliness_level?: number | null
          overall_condition?: string
          redness_level?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_insights: {
        Row: {
          confidence_level: number | null
          created_at: string | null
          id: string
          insight_text: string
          insight_type: string
          is_active: boolean | null
          related_food_id: string | null
          related_product_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string | null
          id?: string
          insight_text: string
          insight_type: string
          is_active?: boolean | null
          related_food_id?: string | null
          related_product_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          confidence_level?: number | null
          created_at?: string | null
          id?: string
          insight_text?: string
          insight_type?: string
          is_active?: boolean | null
          related_food_id?: string | null
          related_product_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
