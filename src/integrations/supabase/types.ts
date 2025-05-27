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
      ai_generated_content: {
        Row: {
          content: Json
          content_type: string
          created_at: string
          id: string
          product_id: string
          product_type: string
          updated_at: string
        }
        Insert: {
          content: Json
          content_type: string
          created_at?: string
          id?: string
          product_id: string
          product_type: string
          updated_at?: string
        }
        Update: {
          content?: Json
          content_type?: string
          created_at?: string
          id?: string
          product_id?: string
          product_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      contributing_factors_catalog: {
        Row: {
          age_range: Json | null
          color: string
          created_at: string | null
          factor_key: string
          factor_name: string
          factor_type: string
          id: string
          impact_description: string
          lifestyle_factors: Json | null
          priority_score: number | null
          routine_factors: Json | null
          skin_concerns: Json | null
          skin_types: Json | null
          updated_at: string | null
        }
        Insert: {
          age_range?: Json | null
          color?: string
          created_at?: string | null
          factor_key: string
          factor_name: string
          factor_type: string
          id?: string
          impact_description: string
          lifestyle_factors?: Json | null
          priority_score?: number | null
          routine_factors?: Json | null
          skin_concerns?: Json | null
          skin_types?: Json | null
          updated_at?: string | null
        }
        Update: {
          age_range?: Json | null
          color?: string
          created_at?: string | null
          factor_key?: string
          factor_name?: string
          factor_type?: string
          id?: string
          impact_description?: string
          lifestyle_factors?: Json | null
          priority_score?: number | null
          routine_factors?: Json | null
          skin_concerns?: Json | null
          skin_types?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
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
      daily_logs: {
        Row: {
          created_at: string | null
          cycle: string | null
          date: string
          food: string | null
          id: string
          makeup: string | null
          notes: string | null
          personalized_plan: boolean | null
          selfie_evening: string | null
          selfie_morning: string | null
          skin_feel: string | null
          sleep_hours: number | null
          stress_level: number | null
          stressors: string | null
          sunscreen_products: string | null
          supplements: string | null
          user_id: string | null
          water_intake: number | null
          weather: string | null
        }
        Insert: {
          created_at?: string | null
          cycle?: string | null
          date: string
          food?: string | null
          id?: string
          makeup?: string | null
          notes?: string | null
          personalized_plan?: boolean | null
          selfie_evening?: string | null
          selfie_morning?: string | null
          skin_feel?: string | null
          sleep_hours?: number | null
          stress_level?: number | null
          stressors?: string | null
          sunscreen_products?: string | null
          supplements?: string | null
          user_id?: string | null
          water_intake?: number | null
          weather?: string | null
        }
        Update: {
          created_at?: string | null
          cycle?: string | null
          date?: string
          food?: string | null
          id?: string
          makeup?: string | null
          notes?: string | null
          personalized_plan?: boolean | null
          selfie_evening?: string | null
          selfie_morning?: string | null
          skin_feel?: string | null
          sleep_hours?: number | null
          stress_level?: number | null
          stressors?: string | null
          sunscreen_products?: string | null
          supplements?: string | null
          user_id?: string | null
          water_intake?: number | null
          weather?: string | null
        }
        Relationships: []
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
      key_observations_catalog: {
        Row: {
          age_range: Json | null
          created_at: string | null
          description: string
          id: string
          lifestyle_factors: Json | null
          observation_key: string
          priority_score: number | null
          skin_concerns: Json | null
          skin_types: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          age_range?: Json | null
          created_at?: string | null
          description: string
          id?: string
          lifestyle_factors?: Json | null
          observation_key: string
          priority_score?: number | null
          skin_concerns?: Json | null
          skin_types?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          age_range?: Json | null
          created_at?: string | null
          description?: string
          id?: string
          lifestyle_factors?: Json | null
          observation_key?: string
          priority_score?: number | null
          skin_concerns?: Json | null
          skin_types?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      master_meal_plan_catalog: {
        Row: {
          activity_level: string | null
          age_range: string | null
          breakfast_options: Json | null
          climate: string | null
          created_at: string | null
          dietary_restrictions: Json | null
          dinner_options: Json | null
          drink_options: Json | null
          duration_days: number | null
          effectiveness_score: number | null
          expected_results: Json | null
          expected_timeline_days: number | null
          generated_at: string | null
          generated_by_user_id: string | null
          generation_cost: number | null
          grocery_list: Json | null
          id: string
          last_used_at: string | null
          llm_provider: string | null
          lunch_options: Json | null
          meal_plan_content: Json
          nutritional_info: Json | null
          plan_description: string | null
          plan_name: string
          primary_skin_benefits: string[] | null
          profile_hash: string
          profile_similarity_tags: Json | null
          search_vector: unknown | null
          secondary_benefits: string[] | null
          skin_concerns: Json | null
          skin_type: string
          sleep_hours: number | null
          snack_options: Json | null
          stress_level: number | null
          target_skin_concerns: string[] | null
          times_used: number | null
          updated_at: string | null
          user_satisfaction_avg: number | null
          user_satisfaction_count: number | null
          version: number | null
          water_intake_liters: number | null
        }
        Insert: {
          activity_level?: string | null
          age_range?: string | null
          breakfast_options?: Json | null
          climate?: string | null
          created_at?: string | null
          dietary_restrictions?: Json | null
          dinner_options?: Json | null
          drink_options?: Json | null
          duration_days?: number | null
          effectiveness_score?: number | null
          expected_results?: Json | null
          expected_timeline_days?: number | null
          generated_at?: string | null
          generated_by_user_id?: string | null
          generation_cost?: number | null
          grocery_list?: Json | null
          id?: string
          last_used_at?: string | null
          llm_provider?: string | null
          lunch_options?: Json | null
          meal_plan_content: Json
          nutritional_info?: Json | null
          plan_description?: string | null
          plan_name: string
          primary_skin_benefits?: string[] | null
          profile_hash: string
          profile_similarity_tags?: Json | null
          search_vector?: unknown | null
          secondary_benefits?: string[] | null
          skin_concerns?: Json | null
          skin_type: string
          sleep_hours?: number | null
          snack_options?: Json | null
          stress_level?: number | null
          target_skin_concerns?: string[] | null
          times_used?: number | null
          updated_at?: string | null
          user_satisfaction_avg?: number | null
          user_satisfaction_count?: number | null
          version?: number | null
          water_intake_liters?: number | null
        }
        Update: {
          activity_level?: string | null
          age_range?: string | null
          breakfast_options?: Json | null
          climate?: string | null
          created_at?: string | null
          dietary_restrictions?: Json | null
          dinner_options?: Json | null
          drink_options?: Json | null
          duration_days?: number | null
          effectiveness_score?: number | null
          expected_results?: Json | null
          expected_timeline_days?: number | null
          generated_at?: string | null
          generated_by_user_id?: string | null
          generation_cost?: number | null
          grocery_list?: Json | null
          id?: string
          last_used_at?: string | null
          llm_provider?: string | null
          lunch_options?: Json | null
          meal_plan_content?: Json
          nutritional_info?: Json | null
          plan_description?: string | null
          plan_name?: string
          primary_skin_benefits?: string[] | null
          profile_hash?: string
          profile_similarity_tags?: Json | null
          search_vector?: unknown | null
          secondary_benefits?: string[] | null
          skin_concerns?: Json | null
          skin_type?: string
          sleep_hours?: number | null
          snack_options?: Json | null
          stress_level?: number | null
          target_skin_concerns?: string[] | null
          times_used?: number | null
          updated_at?: string | null
          user_satisfaction_avg?: number | null
          user_satisfaction_count?: number | null
          version?: number | null
          water_intake_liters?: number | null
        }
        Relationships: []
      }
      master_skin_routine_catalog: {
        Row: {
          created_at: string | null
          id: string
          primary_skin_benefits: string[] | null
          routine_content: Json
          routine_name: string
          secondary_benefits: string[] | null
          target_skin_concerns: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          primary_skin_benefits?: string[] | null
          routine_content: Json
          routine_name: string
          secondary_benefits?: string[] | null
          target_skin_concerns?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          primary_skin_benefits?: string[] | null
          routine_content?: Json
          routine_name?: string
          secondary_benefits?: string[] | null
          target_skin_concerns?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      meal_plan_components: {
        Row: {
          calories_per_serving: number | null
          carbs_grams: number | null
          component_name: string
          component_type: string
          cooking_time_minutes: number | null
          created_at: string | null
          dietary_tags: string[] | null
          difficulty_level: string | null
          fat_grams: number | null
          fiber_grams: number | null
          id: string
          ingredients: Json | null
          key_nutrients: string[] | null
          popularity_score: number | null
          preparation_time_minutes: number | null
          protein_grams: number | null
          recipe_instructions: string[] | null
          skin_benefits: string[] | null
          suitable_for_skin_types: string[] | null
          times_used: number | null
        }
        Insert: {
          calories_per_serving?: number | null
          carbs_grams?: number | null
          component_name: string
          component_type: string
          cooking_time_minutes?: number | null
          created_at?: string | null
          dietary_tags?: string[] | null
          difficulty_level?: string | null
          fat_grams?: number | null
          fiber_grams?: number | null
          id?: string
          ingredients?: Json | null
          key_nutrients?: string[] | null
          popularity_score?: number | null
          preparation_time_minutes?: number | null
          protein_grams?: number | null
          recipe_instructions?: string[] | null
          skin_benefits?: string[] | null
          suitable_for_skin_types?: string[] | null
          times_used?: number | null
        }
        Update: {
          calories_per_serving?: number | null
          carbs_grams?: number | null
          component_name?: string
          component_type?: string
          cooking_time_minutes?: number | null
          created_at?: string | null
          dietary_tags?: string[] | null
          difficulty_level?: string | null
          fat_grams?: number | null
          fiber_grams?: number | null
          id?: string
          ingredients?: Json | null
          key_nutrients?: string[] | null
          popularity_score?: number | null
          preparation_time_minutes?: number | null
          protein_grams?: number | null
          recipe_instructions?: string[] | null
          skin_benefits?: string[] | null
          suitable_for_skin_types?: string[] | null
          times_used?: number | null
        }
        Relationships: []
      }
      meal_plan_usage: {
        Row: {
          completed_at: string | null
          created_at: string | null
          customizations_made: Json | null
          days_followed: number | null
          effectiveness_rating: number | null
          feedback_notes: string | null
          id: string
          meal_plan_id: string | null
          satisfaction_rating: number | null
          started_at: string | null
          substitutions: Json | null
          user_id: string
          user_profile: Json
          would_recommend: boolean | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          customizations_made?: Json | null
          days_followed?: number | null
          effectiveness_rating?: number | null
          feedback_notes?: string | null
          id?: string
          meal_plan_id?: string | null
          satisfaction_rating?: number | null
          started_at?: string | null
          substitutions?: Json | null
          user_id: string
          user_profile: Json
          would_recommend?: boolean | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          customizations_made?: Json | null
          days_followed?: number | null
          effectiveness_rating?: number | null
          feedback_notes?: string | null
          id?: string
          meal_plan_id?: string | null
          satisfaction_rating?: number | null
          started_at?: string | null
          substitutions?: Json | null
          user_id?: string
          user_profile?: Json
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_usage_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "master_meal_plan_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_usage_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "popular_meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      potential_concerns_catalog: {
        Row: {
          age_range: Json | null
          concern_key: string
          concern_title: string
          created_at: string | null
          description: string
          id: string
          prevention_tips: Json | null
          priority_score: number | null
          severity: string
          skin_concerns: Json | null
          skin_types: Json | null
          timeline: string
          trigger_factors: Json | null
          updated_at: string | null
        }
        Insert: {
          age_range?: Json | null
          concern_key: string
          concern_title: string
          created_at?: string | null
          description: string
          id?: string
          prevention_tips?: Json | null
          priority_score?: number | null
          severity: string
          skin_concerns?: Json | null
          skin_types?: Json | null
          timeline: string
          trigger_factors?: Json | null
          updated_at?: string | null
        }
        Update: {
          age_range?: Json | null
          concern_key?: string
          concern_title?: string
          created_at?: string | null
          description?: string
          id?: string
          prevention_tips?: Json | null
          priority_score?: number | null
          severity?: string
          skin_concerns?: Json | null
          skin_types?: Json | null
          timeline?: string
          trigger_factors?: Json | null
          updated_at?: string | null
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
      recommendation_generation_logs: {
        Row: {
          created_at: string | null
          generated_recommendations: Json
          generation_time_ms: number | null
          id: string
          llm_model: string
          llm_provider: string
          skin_profile: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          generated_recommendations: Json
          generation_time_ms?: number | null
          id?: string
          llm_model: string
          llm_provider: string
          skin_profile: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          generated_recommendations?: Json
          generation_time_ms?: number | null
          id?: string
          llm_model?: string
          llm_provider?: string
          skin_profile?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      recommendations_catalog: {
        Row: {
          age_range: Json | null
          category: string
          color: string
          created_at: string | null
          detailed_description: string
          dietary_sources: Json | null
          dosage_instructions: string | null
          forms: Json | null
          how_it_works: string | null
          icon: string
          id: string
          key_benefits: Json | null
          precautions: Json | null
          priority_score: number | null
          recommendation_key: string
          research_summary: string | null
          short_description: string
          skin_concerns: Json | null
          skin_types: Json | null
          subcategory: string | null
          text_color: string
          title: string
          updated_at: string | null
        }
        Insert: {
          age_range?: Json | null
          category: string
          color?: string
          created_at?: string | null
          detailed_description: string
          dietary_sources?: Json | null
          dosage_instructions?: string | null
          forms?: Json | null
          how_it_works?: string | null
          icon?: string
          id?: string
          key_benefits?: Json | null
          precautions?: Json | null
          priority_score?: number | null
          recommendation_key: string
          research_summary?: string | null
          short_description: string
          skin_concerns?: Json | null
          skin_types?: Json | null
          subcategory?: string | null
          text_color?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          age_range?: Json | null
          category?: string
          color?: string
          created_at?: string | null
          detailed_description?: string
          dietary_sources?: Json | null
          dosage_instructions?: string | null
          forms?: Json | null
          how_it_works?: string | null
          icon?: string
          id?: string
          key_benefits?: Json | null
          precautions?: Json | null
          priority_score?: number | null
          recommendation_key?: string
          research_summary?: string | null
          short_description?: string
          skin_concerns?: Json | null
          skin_types?: Json | null
          subcategory?: string | null
          text_color?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      selfies_metadata: {
        Row: {
          created_at: string
          date: string
          file_path: string
          filename: string
          id: string
          index: number
          public_url: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          file_path: string
          filename: string
          id?: string
          index: number
          public_url: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          file_path?: string
          filename?: string
          id?: string
          index?: number
          public_url?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      skin_analysis_cache: {
        Row: {
          analysis_data: Json
          expires_at: string | null
          generated_at: string | null
          generation_time_ms: number | null
          id: string
          llm_model: string
          llm_provider: string
          skin_profile: Json
          token_usage: number | null
          user_id: string | null
        }
        Insert: {
          analysis_data: Json
          expires_at?: string | null
          generated_at?: string | null
          generation_time_ms?: number | null
          id?: string
          llm_model?: string
          llm_provider?: string
          skin_profile: Json
          token_usage?: number | null
          user_id?: string | null
        }
        Update: {
          analysis_data?: Json
          expires_at?: string | null
          generated_at?: string | null
          generation_time_ms?: number | null
          id?: string
          llm_model?: string
          llm_provider?: string
          skin_profile?: Json
          token_usage?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      skin_analysis_generation_logs: {
        Row: {
          cached_items: Json | null
          cost_estimate: number | null
          created_at: string | null
          generated_items: Json | null
          generation_time_ms: number | null
          id: string
          llm_model: string
          llm_provider: string
          sections_generated: Json
          skin_profile: Json
          token_usage: number | null
          user_id: string | null
        }
        Insert: {
          cached_items?: Json | null
          cost_estimate?: number | null
          created_at?: string | null
          generated_items?: Json | null
          generation_time_ms?: number | null
          id?: string
          llm_model: string
          llm_provider: string
          sections_generated: Json
          skin_profile: Json
          token_usage?: number | null
          user_id?: string | null
        }
        Update: {
          cached_items?: Json | null
          cost_estimate?: number | null
          created_at?: string | null
          generated_items?: Json | null
          generation_time_ms?: number | null
          id?: string
          llm_model?: string
          llm_provider?: string
          sections_generated?: Json
          skin_profile?: Json
          token_usage?: number | null
          user_id?: string | null
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
          personalized_plan_preference: string | null
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
          personalized_plan_preference?: string | null
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
          personalized_plan_preference?: string | null
          redness_level?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      skin_routine_usage: {
        Row: {
          created_at: string | null
          days_followed: number | null
          id: string
          is_active: boolean | null
          routine_id: string | null
          started_at: string | null
          updated_at: string | null
          user_id: string
          user_profile: Json | null
        }
        Insert: {
          created_at?: string | null
          days_followed?: number | null
          id?: string
          is_active?: boolean | null
          routine_id?: string | null
          started_at?: string | null
          updated_at?: string | null
          user_id: string
          user_profile?: Json | null
        }
        Update: {
          created_at?: string | null
          days_followed?: number | null
          id?: string
          is_active?: boolean | null
          routine_id?: string | null
          started_at?: string | null
          updated_at?: string | null
          user_id?: string
          user_profile?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "skin_routine_usage_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "master_skin_routine_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      user_contributing_factors_mappings: {
        Row: {
          created_at: string | null
          factor_key: string | null
          id: string
          last_shown_at: string | null
          relevance_score: number | null
          shown_count: number | null
          skin_profile_snapshot: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          factor_key?: string | null
          id?: string
          last_shown_at?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          factor_key?: string | null
          id?: string
          last_shown_at?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_contributing_factors_mappings_factor_key_fkey"
            columns: ["factor_key"]
            isOneToOne: false
            referencedRelation: "contributing_factors_catalog"
            referencedColumns: ["factor_key"]
          },
        ]
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
      user_key_observations_mappings: {
        Row: {
          created_at: string | null
          id: string
          last_shown_at: string | null
          observation_key: string | null
          relevance_score: number | null
          shown_count: number | null
          skin_profile_snapshot: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_shown_at?: string | null
          observation_key?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_shown_at?: string | null
          observation_key?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_key_observations_mappings_observation_key_fkey"
            columns: ["observation_key"]
            isOneToOne: false
            referencedRelation: "key_observations_catalog"
            referencedColumns: ["observation_key"]
          },
        ]
      }
      user_potential_concerns_mappings: {
        Row: {
          concern_key: string | null
          created_at: string | null
          id: string
          last_shown_at: string | null
          relevance_score: number | null
          shown_count: number | null
          skin_profile_snapshot: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          concern_key?: string | null
          created_at?: string | null
          id?: string
          last_shown_at?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          concern_key?: string | null
          created_at?: string | null
          id?: string
          last_shown_at?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_potential_concerns_mappings_concern_key_fkey"
            columns: ["concern_key"]
            isOneToOne: false
            referencedRelation: "potential_concerns_catalog"
            referencedColumns: ["concern_key"]
          },
        ]
      }
      user_profiles: {
        Row: {
          birth_date: string | null
          created_at: string | null
          current_products: string[] | null
          current_products_other: string | null
          cycle_type: string | null
          family_has_skin_issues: boolean | null
          family_history: string[] | null
          family_history_other: string | null
          family_skin_issues_details: string | null
          food_allergies: string[] | null
          food_allergies_other: string | null
          gender: string | null
          goal_timeline: string | null
          id: string
          last_period_date: string | null
          menstrual_cycle: string | null
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
          routine_effectiveness: number | null
          skin_concerns: string[] | null
          skin_goals: string[] | null
          skin_type: string | null
          skincare_allergies: string[] | null
          skincare_allergies_other: string | null
          subscription_plan: string | null
          updated_at: string | null
          user_id: string | null
          wants_referral_link: boolean | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          current_products?: string[] | null
          current_products_other?: string | null
          cycle_type?: string | null
          family_has_skin_issues?: boolean | null
          family_history?: string[] | null
          family_history_other?: string | null
          family_skin_issues_details?: string | null
          food_allergies?: string[] | null
          food_allergies_other?: string | null
          gender?: string | null
          goal_timeline?: string | null
          id?: string
          last_period_date?: string | null
          menstrual_cycle?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          routine_effectiveness?: number | null
          skin_concerns?: string[] | null
          skin_goals?: string[] | null
          skin_type?: string | null
          skincare_allergies?: string[] | null
          skincare_allergies_other?: string | null
          subscription_plan?: string | null
          updated_at?: string | null
          user_id?: string | null
          wants_referral_link?: boolean | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          current_products?: string[] | null
          current_products_other?: string | null
          cycle_type?: string | null
          family_has_skin_issues?: boolean | null
          family_history?: string[] | null
          family_history_other?: string | null
          family_skin_issues_details?: string | null
          food_allergies?: string[] | null
          food_allergies_other?: string | null
          gender?: string | null
          goal_timeline?: string | null
          id?: string
          last_period_date?: string | null
          menstrual_cycle?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          routine_effectiveness?: number | null
          skin_concerns?: string[] | null
          skin_goals?: string[] | null
          skin_type?: string | null
          skincare_allergies?: string[] | null
          skincare_allergies_other?: string | null
          subscription_plan?: string | null
          updated_at?: string | null
          user_id?: string | null
          wants_referral_link?: boolean | null
        }
        Relationships: []
      }
      user_recommendation_mappings: {
        Row: {
          created_at: string | null
          id: string
          last_shown_at: string | null
          recommendation_key: string | null
          relevance_score: number | null
          shown_count: number | null
          skin_profile_snapshot: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_shown_at?: string | null
          recommendation_key?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_shown_at?: string | null
          recommendation_key?: string | null
          relevance_score?: number | null
          shown_count?: number | null
          skin_profile_snapshot?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_recommendation_mappings_recommendation_key_fkey"
            columns: ["recommendation_key"]
            isOneToOne: false
            referencedRelation: "recommendations_catalog"
            referencedColumns: ["recommendation_key"]
          },
        ]
      }
      weekly_ratings: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          rating: number
          updated_at: string
          user_id: string
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          rating: number
          updated_at?: string
          user_id: string
          week_end_date: string
          week_start_date: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          rating?: number
          updated_at?: string
          user_id?: string
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      meal_plan_analytics: {
        Row: {
          avg_effectiveness: number | null
          avg_usage_per_plan: number | null
          estimated_cost_saved: number | null
          popular_plans: number | null
          total_generation_cost: number | null
          total_meal_plans: number | null
          total_usage_count: number | null
          unique_skin_types: number | null
        }
        Relationships: []
      }
      popular_meal_plans: {
        Row: {
          effectiveness_score: number | null
          expected_timeline_days: number | null
          id: string | null
          last_used_at: string | null
          plan_name: string | null
          primary_skin_benefits: string[] | null
          skin_type: string | null
          times_used: number | null
          user_satisfaction_avg: number | null
        }
        Relationships: []
      }
      skin_type_coverage: {
        Row: {
          avg_effectiveness: number | null
          covered_age_ranges: string | null
          plan_count: number | null
          skin_type: string | null
          total_usage: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      find_matching_meal_plans: {
        Args: {
          p_skin_type: string
          p_stress_level: number
          p_sleep_hours: number
          p_water_intake: number
          p_age_range: string
          p_activity_level: string
          p_dietary_restrictions?: Json
          p_skin_concerns?: Json
          p_climate?: string
          p_limit?: number
        }
        Returns: {
          id: string
          plan_name: string
          meal_plan_content: Json
          match_score: number
          times_used: number
          effectiveness_score: number
          expected_timeline_days: number
        }[]
      }
      generate_profile_hash: {
        Args: {
          p_skin_type: string
          p_stress_level: number
          p_sleep_hours: number
          p_water_intake: number
          p_age_range: string
          p_activity_level: string
          p_dietary_restrictions?: Json
          p_skin_concerns?: Json
          p_climate?: string
        }
        Returns: string
      }
      record_meal_plan_usage: {
        Args: {
          p_meal_plan_id: string
          p_user_id: string
          p_user_profile: Json
        }
        Returns: string
      }
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
